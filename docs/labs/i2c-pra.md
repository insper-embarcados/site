# Lab 6 - I2C - Prática <Badge type="tip" text="70% da nota do lab" />

::::: center
:::: third 
::: box-blue 1. Classroom
[:memo: Prática](https://classroom.github.com/a/1OcvE9CG) 
:::
::::
:::: third
::: box-yellow 2. Entrega final
[Enviar no PrairieLearn](https://us.prairielearn.com/pl/course_instance/188020)
:::
::::
:::: third
::: box Nota
70% da nota do laboratório
:::
::::
:::: third
::::
:::::

Neste laboratório iremos substituir o joystick analógico por uma IMU para implementarmos um "pointer" (esses usados para apresentacão!). Como o [spotlight da logitech]( https://www.logitech.com/pt-br/products/presenters/spotlight-presentation-remote.910-005216.html). 

<YouTube id="8C9EGM1Bh3c"/>

Para isso, vocês precisarão de:

| Lista de Materiais | Valor    |
|--------------------|----------|
| 1x MPU6050         | R$ 20,00 |

::: info
Você devem utilizar o mesmo python do lab passado.
:::

![](https://user-images.githubusercontent.com/107638696/241324971-43b8fe88-447d-4c2d-9296-4b3aaa50f4ce.png)

## Requisitos

No lugar do joystick, agora você deve fazer a leitura da IMU6050 formatar os dados corretamente e enviar via serial para a leitura do programa python.

Vocês precisarão implementar um "mouse click", que deve ser acionado quando o sistema embarcado perceber uma movimentação repentina na horizontal no sentido para frente, como se estivesse cutucando o ar. Para isso vão precisar identificar esse tipo de movimentação e fazer o envio para o python (que deverá ser modificado).

![](imgs/lab-i2c-diagrama.png)

## Firmware fornecido

O Firmware fornecido é inspirado no exemplo [oficial da raspberrypi](https://github.com/raspberrypi/pico-examples/tree/master/i2c/mpu6050_i2c) pico para o sensor MPU6050, modificado para fazer uso do Freertos, a conexão deve ser a mesma da indicada no repositório do fabricante:

![](https://github.com/raspberrypi/pico-examples/raw/master/i2c/mpu6050_i2c/mpu6050_i2c_bb.png)

O firmware faz leituras periódicas do sensor e imprime os valores de aceleração, giro e temperatura (interna do chip) no terminal:

```c
while(1) {
    mpu6050_read_raw(acceleration, gyro, &temp);

    vTaskDelay(pdMS_TO_TICKS(10));
}
```

::: warning
Se você for utilizar a PICO DOCK, você deve alterar os pinos do I2C:

```diff
-const int I2C_SDA_GPIO = 4;
-const int I2C_SCL_GPIO = 5;

+const int I2C_SDA_GPIO = 17;
+const int I2C_SCL_GPIO = 16;
```

E utilizar esses pinos novos para conectar a MPU6050.

Os pinos originais 4 e 5 estão conectados aos botões da placa, e nesse botões colocamos um capacitor para realziar o deboucing, por conta disso o barramento I2C não funciona!
:::

::: tip 
Execute o código e verifique se ele funciona.
:::

## Fusão de dados

Os dados brutos de aceleração e giro não são muito fáceis de se usar, pois precisam ser "fundidos" para fornecerem informacoes mais úteis, uma dessas informacoes que podemos obter da fusão dos dados é chamada de "orientacão" (`roll, pitch e yaw`).

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yaw_Axis_Corrected.svg/375px-Yaw_Axis_Corrected.svg.png)

Existem diversos algortímos que realizam essa fusão de dados, e IMUs mais poderosas podem fazer isso internamente, mas não é o caso da nossa (IMUs que fazem fusão são um pouco mais caras!). Para obtermos a orientacão iremos usar uma biblioteca escrita em C para sistemas embarcados chamada de [xioTechnologies/Fusion](https://github.com/xioTechnologies/Fusion). A biblioteca já foi importada para vocês, ser necessário apenas utilizar.

A lib que iremos utilizar é a:

- https://github.com/xioTechnologies/Fusion/blob/main/Examples/Simple/main.c

A seguir um exemplo de como ler a MPU e realizar a fusão dos dados:

```c
void mpu6050_task(void *p) {
  // .... 
  // configuracao da mpu e i2c

  FusionAhrs ahrs;
  FusionAhrsInitialise(&ahrs);
  
  while (true) { 

      mpu6050_read_raw(acceleration, gyro, &temp);
      FusionVector gyroscope = {
          .axis.x = gyro[0] / 131.0f, // Conversão para graus/s
          .axis.y = gyro[1] / 131.0f,
          .axis.z = gyro[2] / 131.0f,
      };

      FusionVector accelerometer = {
          .axis.x = acceleration[0] / 16384.0f, // Conversão para g
          .axis.y = acceleration[1] / 16384.0f,
          .axis.z = acceleration[2] / 16384.0f,
      };      
  
      FusionAhrsUpdateNoMagnetometer(&ahrs, gyroscope, accelerometer, SAMPLE_PERIOD);
  
      const FusionEuler euler = FusionQuaternionToEuler(FusionAhrsGetQuaternion(&ahrs));
  
      printf("Roll %0.1f, Pitch %0.1f, Yaw %0.1f\n", euler.angle.roll, euler.angle.pitch, euler.angle.yaw);
      vTaskDelay(pdMS_TO_TICKS(10));
  }
```

::: warning Atenção!
- Notem que a lib necessita saber a taxa de amostragem! `SAMPLE_PERIOD`, vocês precisam ajustar com o valor de vocês!
- Esse exemplo não faz uso de bussolá (pois nossa IMU não possui), isso acrescenta um *drift* no resultado, ou seja, mesmo com a IMU parada vamos notar um "movimento" (a bussolá tenta corrigir isso). 
:::

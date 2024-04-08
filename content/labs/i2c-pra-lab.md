# i2c - Prática

| Lab 6 - i2c - Prática                                   |
|-----------------------------------------------------------|
| **Prazo**: =={{lab_i2c_pra_deadline}}==               |
| [Repositório no classroom]({{lab_i2c_pra_classroom}}) |
| 💰 70% nota de lab                                        |

Neste laboratório iremos substituir o joystick analógico por uma IMU para implementarmos um "pointer" (esses usados para apresentacão!). Como o [spotlight da logitech]( https://www.logitech.com/pt-br/products/presenters/spotlight-presentation-remote.910-005216.html)

!!! video
    ![](https://resource.logitech.com/w_1920,ac_none,f_auto,dpr_1.0,q_auto:best/content/dam/logitech/en/products/presenters/spotlight/spotlight-video-final.mp4)

Para isso, vocês precisarão de:

| Lista de Materiais | Valor    |
|--------------------|----------|
| 1x MPU6050         | R$ 20,00 |

## Requisitos

Fazer a leitura da IMU6050 formatar os dados corretamente e enviar via serial para a leitura do programa python.

### Firmware fornecido

O Firmware fornecido é inspirado no exemplo [oficial da raspberrypi](https://github.com/raspberrypi/pico-examples/tree/master/i2c/mpu6050_i2c) pico para o sensor MPU6050, modificado para fazer uso do Freertos, a conexão deve ser a mesma da indicada no repositório do fabricante:

![](https://github.com/raspberrypi/pico-examples/raw/master/i2c/mpu6050_i2c/mpu6050_i2c_bb.png)

O firmware faz leituras periódicas do sensor e imprime os valores de aceleração, giro e temperatura (interna do chip) no terminal:

```c
while(1) {
    mpu6050_read_raw(acceleration, gyro, &temp);
    printf("Acc. X = %d, Y = %d, Z = %d\n", acceleration[0], acceleration[1], acceleration[2]);
    printf("Gyro. X = %d, Y = %d, Z = %d\n", gyro[0], gyro[1], gyro[2]);
    printf("Temp. = %f\n", (temp / 340.0) + 36.53);

    vTaskDelay(pdMS_TO_TICKS(10));
}
```

### Fusão de dados

Os dados brutos de aceleração e giro não são muito fáceis de se usar, pois precisam ser "fundidos" para fornecerem informacoes mais úteis, uma dessas informacoes que podemos obter da fusão dos dados é chamada de "orientacão" (`roll, pitch e yaw`).

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yaw_Axis_Corrected.svg/375px-Yaw_Axis_Corrected.svg.png)

Existem diversos algortímos que realizam essa fusão de dados, e IMUs mais poderosas podem fazer isso internamente, mas não é o caso da nossa (IMUs que fazem fusão são um pouco mais caras!). Para obtermos a orientacão iremos usar uma biblioteca escrita em C para sistemas embarcados chamada de [xioTechnologies/Fusion](https://github.com/xioTechnologies/Fusion). A biblioteca já foi importada para vocês, ser necessário apenas utilizar.

Consulte o exemplo fornecido pelo desenvolvedor de como utilizar a lib:

- https://github.com/xioTechnologies/Fusion/blob/main/Examples/Simple/main.c

```c
#define SAMPLE_PERIOD (0.01f) // replace this with actual sample period

int main() {
  FusionAhrs ahrs;
  FusionAhrsInitialise(&ahrs);
  
  while (true) { // this loop should repeat each time new gyroscope data is available
      const FusionVector gyroscope = {0.0f, 0.0f, 0.0f}; // replace this with actual gyroscope data in degrees/s
      const FusionVector accelerometer = {0.0f, 0.0f, 1.0f}; // replace this with actual accelerometer data in g
  
      FusionAhrsUpdateNoMagnetometer(&ahrs, gyroscope, accelerometer, SAMPLE_PERIOD);
  
      const FusionEuler euler = FusionQuaternionToEuler(FusionAhrsGetQuaternion(&ahrs));
  
      printf("Roll %0.1f, Pitch %0.1f, Yaw %0.1f\n", euler.angle.roll, euler.angle.pitch, euler.angle.yaw);
  }
```

!!! warning "Atenção!"
    - Notem que a lib necessita saber a taxa de amostragem! `SAMPLE_PERIOD`, vocês precisam ajustar com o valor de vocês!
    - As variáveis `gyroscope` e `accelerometer` devem ser atualizadas com o valor lido da IMU!
    - Reparem no tipo de variável que é lido da IMU com o que é exigido no Fusion
    - Esse exemplo não faz uso de bussolá (pois nossa IMU não possui), isso acrescenta um *drift* no resultado, ou seja, mesmo com a IMU parada vamos notar um "movimento" (a bussolá tenta corrigir isso). 

# Expert - Firmware - Driver

| Lab Expert - DSP - Áudio Preparatório                          |
|----------------------------------------------------------------|
| **Deadline**: {{lab_expert_firmware_driver_deadline}}                |
| [Repositório no classroom]({{lab_expert_firmware_driver_classroom}}) |
| 💰 100% nota de lab                                            |

Neste laboratório de especializaćão de firmware vocês vão aprender como criar drivers para periféricos a fim de tornar o código mais portátil, eficiente e com menos falhas.

## Lab

Drivers podem ser entendidos como uma camada de software que desacopla o acesso de uma aplicaćão a um recurso ou hardware específico. 

![](imgs-firmware/driver-layers.png)

O termo `drivers` pode aparecer com diferentes nomes: `library`, `api`, `framework`, mas quando o foco é sistemas embarcados e a abstraćão se refere a um componente de hardware as opcões mais apropriadas são: `hardware abstraction layer (HAL)` ou `driver`.

Os drivers podem ser disponibilizados de deiversas maneiras diferentes, mas no final, será composto por uma série de arquivos `.h` e `.c` que vão possibilitar a interface com entre a aplicacao e o hardware em questão.

### cmake

O universo de desenvolvimento da rasp pico é baseado em `CMake`, uma ferramenta cross pataforma para automatizacã́o do processo de `build` para programas em `c` e `c++`.  

Leia esse material para entender como podemos criar uma lib em `c` no sistema de `CMake` da pico:

- Lib em `c` na pico via `CMake`:  https://community.element14.com/products/raspberry-pi/b/blog/posts/raspberry-pico-and-cmake---create-your-own-c-lib-with-header-files

### Drivers

Drivers são 

### MPU6050

A mpu6050 possui muitos recursos que não foram explorados no laboratório, iremos nessa entrega expandir as opcões que podemos usar módulo, por exemplo, o MPU6050 pode detectar queda ou identificar quando alguém da um `tap` no sensor. Além disso, podemos configurar a resolućão que o acelerometro vai trabalhar: `+-2G`, `+-4G`... `16G` (depende da aplicacao 2G pode saturar o sinal).

Lembrem de consultarem os manuais da MP6050 para mais informaćòes:

- https://cdn.sparkfun.com/datasheets/Sensors/Accelerometers/RM-MPU-6000A.pdf
- https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf

## Entrega

Nessa entrega vocês devem criar um driver chamado MPU6050 com os seguintes arquivos:

- `MPU6050/mpu6050.h`: Configurações e prototypes
- `MPU6050/mpu6050.c`: Implementaćão das funções

Esses arquivos deve ser uma lib do projeto do CMake!

Para deixarmos o driver mais genérico possível, vamos definir uma struct que possui as configurações necessárias para a IMU: 

``` h
typedef struct imu6050 {
    // pinos
    int pin_sda;
    int pin_scl;
 
    // configuracao do range do acelerometro
    int acc_scale;
} imu_t;
```

Você deve criar as seguintes funções e demonstrar o seu uso em um projeto:

- Configura o struct de configuracao do componente.

```c
mpu6050_set_config(imu_c config, pin_sda, pin_scl, freq) { ... } 
```

- Configura pinos e periférico i2c:

```c
int mpu6050_init(imu_c config) { ... } 
```

- Reinicia o device para o estado original:

```c
int mpu6050_reset() { .. }
```

- Faz a leitura do acelerometro:

``` c
int mpu6050_read_acc(imu_c config, int16_t accel[3]) { .. }
```

- Faz a leitura do gyro:

``` c
int mpu6050_read_gyro(imu_c config, int16_t gyro[3]) { .. }
```

- Faz a leitura da temperatura:

``` c
int mpu6050_read_temp(imu_c config, int16_t *temp) { .. }
```

Exemplos de uso:

```c
imu_c imu_config;
int accel[3];
int gyro[3];
int tmp;

mpu6050_set_config(&imu_config, 12, 13, 200000);
mpu6050_reset(imu_config);

while(1) {
  mpu6050_read_acc(config, accel) { .. }
  mpu6050_read_gyro(config, gyro) { .. }
  mpu6050_read_temp(config, &temp) { .. }
}
```

- Melhorar driver da IMU
  - Criar funcoes
  - Modo sleep
  - Usar pino de IRQ do módulo
  - multicore?

Um driver 


## Entrega

Para realizar a entrega, você deverá ler:

- Lib em `c` na pico via `CMake`:  https://community.element14.com/products/raspberry-pi/b/blog/posts/raspberry-pico-and-cmake---create-your-own-c-lib-with-header-files

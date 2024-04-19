# Volume 

Página com dicas de como controlar o volume no windows/linux.

## No Linux

Consultar site:

- https://prateeksrivastav598.medium.com/controlling-linux-speaker-functions-with-python-pyalsaaudio-vs-pyttsx3-28f1d96cd97f


## No windows

Para o controle do volume do windows, podemos usar o `pycaw`:

```py
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(.interface, POINTER(IAudioEndpointVolume))
```

E agora podemos definir o volume com:

```py
volume.SetMasterVolumeLevel(VALUE, None)
```

Sendo `VALUE` um valor em decibéis (0 é máximo e `-51` mínimo), use a tabela a seguir como escala:

```py
volume2decibal = {
            0.00: -51,
            0.05: -40,
            0.10: -30.848,
            0.15: -26,
            0.20: -22.477,
            0.25: -20,
            0.30: -17.111,
            0.35: -15,
            0.40: -13.152,
            0.45: -11,
            0.50: -10.015,
            0.55: -8.5,
            0.60: -7.415,
            0.65: -6,
            0.70: -4.991,
            0.75: -4,
            0.80: -3.26,
            0.85: -2,
            0.90: -1.381,
            0.95: -0.6,
            1:    0
        }
```



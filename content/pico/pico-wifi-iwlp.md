# Pico - lwip

`lwip` é uma implementaćão open source da pilha TPC/IP com foco em sistemas embarcados.

- https://www.raspberrypi.com/documentation/pico-sdk/networking.html#pico_lwip

## Alternando entre lwip e cyw43

Para podermos usar os comandos do `lwip` precisamos indicar para o módulo wifi `cyw43` que queremos entrar nesse módo, para isso as funćões devem estar encapsuladas entre essas duas chamadas de funćão `cyw43_arch_lwip_begin();` e `cyw43_arch_lwip_end();` como no exemplo a seguir:

```c
cyw43_arch_lwip_begin();
int err = dns_gethostbyname("hooks.zapier.com", &ipaddr_zapier, zapier_dns_found, NULL);
cyw43_arch_lwip_end();
```

## Resolvendo DNS

Para a abrirmos uma conexão TCP/IP de um `client` (pico) a um `host` (algum servićo na net) temos que primeiro descobrir qual o IP do servidor que queremos nos conectar, isso é feito consultando a rede de servidores de  Domain Name System (DNS). Como as grandes empresas possuem um servićo elástico e sem IP fixo, os IPs mudam toda hora, portanto não podemos assumir que o IP vai ser fixo e sempre o mesmo.


```
ip_addr_t ipaddr_dns;
int ipaddr_dns_f = 0;

// TODO: ADD uma queue
static void dns_found_callback (const char *hostname, const ip_addr_t *ipaddr, void *arg) {
    if (ipaddr) {
        ipaddr_dns_f = 1;
        memcpy(&ipaddr_dns, ipaddr, sizeof(ip_addr_t));
    } else {
        printf("dns request failed\n");
        ipaddr_dns_f = -1;
    }
}

// task dedicada a comunicacao
void foo_com(void) {
    // ...
    // ...
    // ...

    // after wifi connected
    int err;
    
    cyw43_arch_lwip_begin();
    err = dns_gethostbyname("hooks.zapier.com", &ipaddr_dns, dns_found_callback, NULL);
    cyw43_arch_lwip_end();
    
    while(ipaddr_dns_f == 0 && err != ERR_OK) {
                sleep_ms(10);
    }
    printf("zapier address %s\n", ipaddr_ntoa(&ipaddr_zapier));

}
```

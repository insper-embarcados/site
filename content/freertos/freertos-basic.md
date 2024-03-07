# Básico - RTOS   

!!! tip "Embedded FM - episódio 175"
    **How Hard Could It Be?**
    
    Jean Labrosse of Micrium (@Micrium) spoke with us about writing a real time operating system (uC/OS), building a business, and caring about code quality.
    
    - https://embedded.fm/episodes/175

!!! video
    ![](https://youtu.be/F321087yYy4?si=Kzsv1kqhnbWFIgXH)
    
Um sistema operacional é essencialmente um software que facilita a gestão de recursos físicos limitados (como unidades de processamento e memória) para executar múltiplos programas simultaneamente. Além disso, incorpora funcionalidades de abstração de hardware, segurança e ferramentas adicionais, visando otimizar a eficiência do sistema.

Dentro dessa categoria, o Sistema Operacional de Tempo Real (RTOS - Real-Time Operating System) representa uma variante especializada. Embora as diferenças em relação a um sistema operacional convencional possam parecer sutis inicialmente, elas são significativas em operação. As principais características que distinguem um RTOS incluem:

1. Natureza determinística, permitindo a previsão precisa do momento de execução de cada tarefa.
1. Footprint reduzido: RTOSs são frequentemente projetados para terem uma pegada de memória (footprint) pequena, otimizando o uso de recursos do sistema, o que os torna ideais para dispositivos com capacidade de hardware limitada.
1. Alta eficiência na troca de contexto: um RTOS é projetado para realizar trocas de contexto entre programas em execução de forma extremamente rápida e eficiente, utilizando o mínimo possível de ciclos de processamento.
1. Gerenciamento de prioridades de tarefas: em um RTOS, as tarefas são atribuídas com diferentes níveis de prioridade. O sistema garante que tarefas de alta prioridade recebam acesso imediato aos recursos do sistema, superando tarefas de menor prioridade, o que é crucial para aplicações onde algumas operações têm importância crítica.
    
O sistema operacional a ser utilizado é o [FreeRtos (www.freertos.org)](http://freertos.org), um sistema operacional muito utilizado pela industria, sendo o segundo sistema operacional (**20%**) mais utilizado em projetos embarcados, perdendo só para o [Linux](https://m.eet.com/media/1246048/2017-embedded-market-study.pdf). 

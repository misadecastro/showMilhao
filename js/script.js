function carregar(){
    // Lista de perguntas e respostas
    const perguntas = [
        // Nível 1 - Bem fácil 1000 - 5000
        {
            pergunta: "Qual é a cor do céu em um dia ensolarado?",
            opcoes: ["A) Vermelho", "B) Azul", "C) Verde", "D) Amarelo"],
            resposta: 2
        },
        {
            pergunta: "Quantos lados tem um triângulo?",
            opcoes: ["A) 2", "B) 3", "C) 4", "D) 5"],
            resposta: 2
        },
        {
            pergunta: "Quantos meses há em um ano?",
            opcoes: ["A) 10", "B) 11", "C) 12", "D) 13"],
            resposta: 3
        },
        {
            pergunta: "Qual fruta é conhecida por ser amarela e curvada?",
            opcoes: ["A) Banana", "B) Maçã", "C) Laranja", "D) Uva"],
            resposta: 1
        },
        {
            pergunta: "Qual animal é conhecido como o rei da selva?",
            opcoes: ["A) Tigre", "B) Elefante", "C) Leão", "D) Urso"],
            resposta: 3
        },
        // Nível 2 - Um pouco mais difícil 10.000 - 50.000
        {
            pergunta: "Quantos segundos há em um minuto?",
            opcoes: ["A) 30", "B) 60", "C) 90", "D) 120"],
            resposta: 2
        },        
        {
            pergunta: "Qual é o nome da capital da França?",
            opcoes: ["A) Londres", "B) Paris", "C) Roma", "D) Madri"],
            resposta: 2
        },
        {
            pergunta: "O que os humanos respiram para sobreviver?",
            opcoes: ["A) Oxigênio", "B) Hidrogênio", "C) Gás Carbônico", "D) Hélio"],
            resposta: 1
        },
        {
            pergunta: "Qual é o principal ingrediente do pão?",
            opcoes: ["A) Água", "B) Farinha", "C) Fermento", "D) Sal"],
            resposta: 2
        },
        {
            pergunta: "Em qual estação do ano as folhas caem das árvores em climas temperados?",
            opcoes: ["A) Verão", "B) Outono", "C) Inverno", "D) Primavera"],
            resposta: 2
        },
        // Nível 3 - Médio 100.000 - 500.000
        {
            pergunta: "Qual planeta é conhecido como o Planeta Vermelho?",
            opcoes: ["A) Marte", "B) Júpiter", "C) Saturno", "D) Vênus"],
            resposta: 1
        },        
        {
            pergunta: "Qual é o maior mamífero do mundo?",
            opcoes: ["A) Elefante", "B) Baleia-azul", "C) Rinoceronte", "D) Girafa"],
            resposta: 2
        },        
        {
            pergunta: "Qual o único mamiféro que voa?",
            opcoes: ["A) Pinguim", "B) Morcego", "C) Ornitorrinco", "D) Tucano"],
            resposta: 2
        },
        {
            pergunta: "Quantos dias há em um ano bissexto?",
            opcoes: ["A) 364", "B) 365", "C) 366", "D) 367"],
            resposta: 3
        },
        {
            pergunta: "Qual é o menor planeta do sistema solar?",
            opcoes: ["A) Mercúrio", "B) Vênus", "C) Marte", "D) Plutão"],
            resposta: 1
        },
        // Nível 4 - 1.0000
        {
            pergunta: "Quem foi o autor de 'Dom Casmurro'?",
            opcoes: ["A) Machado de Assis", "B) José de Alencar", "C) Clarice Lispector", "D) Monteiro Lobato"],
            resposta: 1
        }
    ];
    

    // Armazenando as perguntas na sessionStorage
    sessionStorage.setItem('perguntas', JSON.stringify(perguntas));

    // Exemplo de como recuperar as perguntas da sessionStorage
    preencher(0)
}

function preencher(numPergunta){

    var btnSeguir = document.getElementById("btnSeguir");
    btnSeguir.setAttribute("data-disabled", "true");
    btnSeguir.setAttribute("num-pergunta", numPergunta);

    const perguntas = JSON.parse(sessionStorage.getItem('perguntas'));
    let pergunta = perguntas[numPergunta];
    document.getElementsByClassName("question")[0].innerHTML = pergunta.pergunta;

    var ul = document.getElementById("opcoes");
    ul.innerHTML = "";

    for (i = 0; i < pergunta.opcoes.length; i++){
        let opcao = pergunta.opcoes[i];
        
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(opcao));
        li.setAttribute("num-resposta", i+1);
        li.classList.add('option'); // added class
        console.log(i);
        li.addEventListener("click", function (e) {            
            responder(pergunta, this);
        });

        ul.appendChild(li);
    }
    console.log(perguntas);
}

function responder(pergunta, li){
    let numResposta = li.getAttribute("num-resposta");
    var resultado = document.getElementById("resultado");
    var btnSeguir = document.getElementById("btnSeguir");
    if(pergunta.resposta == numResposta){
        li.style.backgroundColor = "green";        
        resultado.innerHTML = "Parabéns você acertou!";
        btnSeguir.setAttribute("data-disabled", "false");
        calcularPremio();
    }        
    else{
        li.style.backgroundColor = "red";
        resultado.innerHTML = "Que pena você perdeu!";
        btnSeguir.setAttribute("data-disabled", "true");
        recomecar();
    }        
}

function proximo(){
    var btnSeguir = document.getElementById("btnSeguir");
    var numPergunta = parseInt(btnSeguir.getAttribute("num-pergunta"))+1;
    const perguntas = JSON.parse(sessionStorage.getItem('perguntas'));

    if(perguntas.length > numPergunta)
        preencher(numPergunta);
    else{
        alert('Parabéns você é o demais!')
        recomecar();
    }
        
}

function recomecar(){
    var btnSeguir = document.getElementById("btnSeguir");
    var btnRecomecar = document.getElementById("btnRecomecar");
    btnSeguir.style.display = "none";
    btnRecomecar.style.display = "block";
}

function calcularPremio(){
    var premio = document.getElementById("premio");
    var valor = parseFloat(premio.getAttribute("valor"));

    if(valor < 5000)
        valor = valor+1000;
    else if(valor < 10000)
        valor = valor+5000;
    else if(valor < 50000)
        valor = valor+10000;
    else if(valor < 100000)
        valor = valor+50000;
    else if(valor < 500000)
        valor = valor+100000;
    else 
        valor = valor+500000;

    premio.innerHTML = valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    premio.setAttribute("valor",valor);
}

import EntradadeDados from 'readline-sync';

var nome_prestador = " ";
var valor_bruto = 0;
var valor_INSS_total = 0;
var valor_INSS_declarado = 0;
var valor_IR_total = 0;
var valor_IR_pago = 0;
var valor_liquido = 0;
var menu_preencher_rapido = 0;
var valor_reato = 0;

do {
    limpar();
    menu_questionario();
    menu_preencher_rapido = EntradadeDados.question("Entre com o valor que deseja : ")
    switch (menu_preencher_rapido) {
      case "1":
        limpar();
        nome_prestador = EntradadeDados.question("Digite o nome do prestador : ");
        break;
      
      case "2":
        limpar();
        valor_bruto = EntradadeDados.question("Entre com o valor BRUTO do prestador : ");
        valor_bruto = filtrar_Numero(valor_bruto);
        calcular_valor_INSS();
        calcular_valor_IR();
        calcular_valor_liquido();
        calculo_valor_da_reato();
        break;
      
      case "3":
        limpar();
        valor_INSS_declarado = EntradadeDados.question("Qual o Valor do INSS : ");
        valor_INSS_declarado = filtrar_Numero(valor_INSS_declarado);
        break;

      case "S":
        limpar();
        var auxiliar_soma = EntradadeDados.question(valor_INSS_declarado + " + ");
        auxiliar_soma = filtrar_Numero(auxiliar_soma);
        valor_INSS_declarado = valor_INSS_declarado + auxiliar_soma;
        break;

      case "A":
        limpar();
        var auxiliar_soma2 = EntradadeDados.question(valor_IR_pago + "+");
        auxiliar_soma2 = filtrar_Numero(auxiliar_soma2);
        valor_IR_pago = valor_IR_pago + auxiliar_soma2;
        break;

      case "4":
        valor_IR_pago = EntradadeDados.question("Qual o Valor do IR Declarado : ");
        valor_IR_pago = filtrar_Numero(valor_IR_pago);
        break;
      
      case "Sair":
      
      break;

      default:
        limpar();
        erro_de_valor(); 
        pausar();
        break;
    }
  } while (menu_preencher_rapido != "Sair");

function menu_questionario(){
  linha();
  console.log("*** 1 - Prestador : "+nome_prestador);
  linha();
  console.log("*** 2 - Valor bruto : "+valor_bruto);
  linha();
  console.log("*** 3 ou S - INSS ja declarado : "+valor_INSS_declarado);
  linha();
  console.log("*** 4 ou A - IR ja declarado : "+valor_IR_pago);
  linha();
  console.log("***     INSS total : "+valor_INSS_total);
  linha();
  console.log("***     IR total : "+valor_IR_total);
  linha();
  console.log("***     Valor liquido repassado ao prestador : "+valor_liquido);
  linha();
  linha();
  console.log("**** Valor de INSS para proxima NF: R$"+(valor_INSS_total-valor_INSS_declarado));
  console.log("**** Valor de IR para proxima NF: R$"+(valor_IR_total - valor_IR_pago));
  linha();
  console.log("**** Valor que fica Prareato: R$"+valor_reato);
  linha();
  console.log("*** 'Sair' = Sair                                             ***");
  linha()
}

function calcular_valor_INSS(){
  //alicota <= 1302
  if (valor_bruto >= 1302.01) {
    valor_INSS_total = 1302.00 * 0.075;
  }else{
    valor_INSS_total = valor_bruto * 0.075;
  }
  //alicota entre 1302 e 2571,29
  if (valor_bruto >= 2571.30){
    valor_INSS_total = valor_INSS_total + ((2571.29-1302.00) * 0.09);
  }else if(valor_bruto > 1302.01){
    valor_INSS_total = valor_INSS_total + ((valor_bruto - 1302.00) * 0.09);
  }
  //alicota entre 2571,30 e 3856,94
  if (valor_bruto >= 3856.95 ){
    valor_INSS_total = valor_INSS_total + ((3856.94-2571.29) * 0.12);
  }else if(valor_bruto>2571.30){
    valor_INSS_total = valor_INSS_total + ((valor_bruto - 2571.29) * 0.12);
  }

  if (valor_bruto >= 7507.49){
    valor_INSS_total = valor_INSS_total + ((7507.49 - 3856.94) * 0.14);
  }else if(valor_bruto > 3856.95){
    valor_INSS_total = valor_INSS_total + ((valor_bruto - 3856.94) * 0.14);
  }
}

function calcular_valor_IR(){
  if((valor_bruto - valor_INSS_total) >=1903.99){
    valor_IR_total = 0;
  }else{
    valor_IR_total = 0;
  }

  if((valor_bruto - valor_INSS_total) >=2826.65){
    valor_IR_total = 922.67 * 0.075 ;
  }else if((valor_bruto - valor_INSS_total) >1903.99){
    valor_IR_total = ((valor_bruto - valor_INSS_total) - 1903.98) * 0.075;
  }

  if((valor_bruto - valor_INSS_total) >=3751.06){
    valor_IR_total = valor_IR_total + (924.40 * 0.15) ;
  }else if((valor_bruto - valor_INSS_total) >2826.65){
    valor_IR_total = valor_IR_total + (((valor_bruto - valor_INSS_total) - 2826.65) * 0.15);
  }

  if((valor_bruto - valor_INSS_total) >=4664.68){
    valor_IR_total = valor_IR_total + (913.63 * 0.225) ;
  }else if((valor_bruto - valor_INSS_total) >3751.06){
    valor_IR_total = valor_IR_total + (((valor_bruto - valor_INSS_total) - 3751.06) * 0.225);
  }
  
  if((valor_bruto - valor_INSS_total) >= 4664.70){
    valor_IR_total = valor_IR_total + (((valor_bruto - valor_INSS_total) - 4664.68) * 0.275);
  }
}

function calculo_valor_da_reato(){
  
  valor_reato = ((valor_bruto - valor_INSS_total)/100)*35;
}

function calcular_valor_liquido(){
valor_liquido = (valor_bruto - valor_INSS_total) - valor_IR_total ;
}

function pausar(){
  EntradadeDados.question("Precione enter para continuar.");
}

function erro_de_valor() {
  console.log("O Valor selecionado nao corresponde com o esperado.");
}

function limpar(){
  console.clear();
}

function linha(){
  console.log("-----------------------------------------------------------------");
}

function filtrar_Numero(valores){
  var valor_tratado_em_decimais = "";
  valor_tratado_em_decimais = valores;
  valor_tratado_em_decimais = valor_tratado_em_decimais.trim();
  valor_tratado_em_decimais = valor_tratado_em_decimais.replace(",",".");
  valor_tratado_em_decimais = Number.parseFloat(valor_tratado_em_decimais);
  if(isNaN(valor_tratado_em_decimais))
  {
    limpar();
    console.log("O Valor Digitado nao é um numero.");
    return valor_tratado_em_decimais = 0;
    pausar();
  }else{
    return valor_tratado_em_decimais;
  }
}
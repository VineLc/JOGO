var somjogo = document.getElementById("somjogo")
var tironave = document.getElementById("tironave")
var explodenave = document.getElementById("explodenave")

var f_nave = 100
var f_tanque = 1150
var f_pessoa = 50

var vel = 5
var pontos = 10  
var fase = 1000
var vida = 4
var pontosAnterior =0

var teclas={
    A:65,
    S:83,
    D:68,
    W:87,
    space:32
}
var jogo={}
jogo.pressionou=[]


$(document).keydown(function(e){
    jogo.pressionou[e.which] = true
})

$(document).keyup(function(e){
    jogo.pressionou[e.which] = false
})
// ======================= DINO =======================
function movimenta_dino(){

    if(jogo.pressionou[teclas.space]){
        var pos_top = $('#dino').css("top")
        pos_top = parseInt(pos_top)
        if (pos_top >=5)
            $('#dino').css("top", pos_top - vel)
   
    }
    else if(jogo.pressionou[teclas.A]){
        var pos_left = $('#dino').css("left")
        pos_left = parseInt(pos_left)
        if (pos_left >=0)
        $('#dino').css("left", pos_left - vel)
    }
    else if(jogo.pressionou[teclas.D]){
        var pos_right = $('#dino').css("left")
        pos_right = parseInt(pos_right)
        if (pos_right <=550)
            $('#dino').css("left", pos_right + vel)
    }    
    else if(jogo.pressionou[teclas.W] != true) {
        var pos_top = $('#dino').css("top")
        pos_top = parseInt(pos_top)
        if (pos_top <=285)
            $('#dino').css("top", pos_top +vel)   
    }

}

    function movimenta_player(){

        if(jogo.pressionou[teclas.W]){
            //console.log("sobe")
            var pos_top = $('#player').css("top")
            pos_top = parseInt(pos_top)
            if (pos_top >=5)
                $('#player').css("top", pos_top - vel)
       
        }
        else if(jogo.pressionou[teclas.S]){
            var pos_down = $('#player').css("top")
            pos_down = parseInt(pos_down)
            if (pos_down <=285)
                $('#player').css("top", pos_down + vel)
        }
        else if(jogo.pressionou[teclas.A]){
            var pos_left = $('#player').css("left")
            pos_left = parseInt(pos_left)
            if (pos_left >=0)
            $('#player').css("left", pos_left - vel)
        }
        else if(jogo.pressionou[teclas.D]){
            var pos_right = $('#player').css("left")
            pos_right = parseInt(pos_right)
            if (pos_right <=550)
                $('#player').css("left", pos_right + vel)
        }    
        else if(jogo.pressionou[teclas.W] != true) {
            var pos_top = $('#player').css("top")
            pos_top = parseInt(pos_top)
            if (pos_top <=285)
                $('#player').css("top", pos_top +vel)   
        }
 // ============== TIRO ===============
    if(jogo.pressionou[teclas.space]){
        tiro()   
    } 
}
function movimenta_cenario(){
    var posicao = parseInt($('#areaJogo').css("background-position"))    
    $('#areaJogo')
        .css("background-position", posicao - (vel -3))

}

function movimentaNave(){
    if($('#inimigo').length ==0 && $('#explosao').length ==0  ){
        $('#areaJogo').append('<div id="inimigo"</div>'),$('#inimigo').css("top", (Math.random() * (290 - 0)))
    }
    var pos_n = $('#inimigo').css("left")
    pos_n = parseInt(pos_n)
        if (pos_n >=0)
            $('#inimigo').css("left", pos_n -(vel+1))
        if (pos_n <=0)
            $('#inimigo').remove(),$('#areaJogo').append('<div id="inimigo"</div>'),$('#inimigo').css("top", (Math.random() * (290 - 0)))
        
    
}

function movimentaTanque(){
    if($('#tanque').length ==0){
        $('#areaJogo').append('<div id="tanque"</div>')
    }
    var pos_n = $('#tanque').css("left")
    pos_n = parseInt(pos_n)
        if (pos_n >=0)
            $('#tanque').css("left", pos_n -(vel+1))
        if (pos_n <=0)
            $('#tanque').remove()
        if (pos_n <=0)
        $('#tanque').remove(),$('#areaJogo').append('<div id="tanque"></div>')
    
}

function movimentaPessoa(){
    var pos_n = $('#pessoa').css("left")
    pos_n = parseInt(pos_n)
        if (pos_n <=650)
            $('#pessoa').css("left", pos_n +(vel -1))
        if (pos_n >=650)
            $('#pessoa').remove()
        if (pos_n >=650)
            $('#areaJogo').append('<div id="pessoa"></div>')
    
}

function loop(){  
    somjogo.addEventListener("ended", function(){
        somjogo.currentTime = 0 
        somjogo.play()
    },false)
    somjogo.play()

    movimenta_cenario()
    movimenta_dino()
    //movimenta_player()
    //movimentaNave()
    //movimentaTanque()
    movimentaPessoa()
    movimentoTiro()
    //colisao()
    valida_pontuação()
    //console.log(posicao)
    
}

function start(){

    $('#alerta').css('display','none')
    $('#areaJogo').append('<div id="dino"></div>')
    $('#areaJogo').append('<div id="cacto"></div>')
    //$('#areaJogo').append('<div id="player"></div>')    
    //$('#areaJogo').append('<div id="tanque"></div>')
    //$('#areaJogo').append('<div id="pessoa"></div>')
    //$('#areaJogo').append('<div id="inimigo"></div>')
    $('#areaJogo').append('<div id="vida"></div>')
    //$('#areaJogo').append('<div id="explosaop"></div>')
    //$('#areaJogo').append('<div id="inimigo_tiro"></div>')
    $('#areaJogo').append('<div id="pontos"></div>')
    setInterval(loop,25)
}


 start()

 
function tiro(){        
    if($('#tiro').length ==0) {
            var p_y = parseInt($('#player').css('top'))
            var p_x = parseInt($('#player').css('left'))
            $('#areaJogo').append('<div id="tiro"></div>');
            $('#tiro').css('top', p_y + 20)
            $('#tiro').css('left', p_x + 80)
    tironave.play() 
    }   
        
}

function movimentoTiro(){
    if($('#tiro').length >0) {
        var tiro_x = parseInt($('#tiro').css('left'))
        $('#tiro').css('left', tiro_x +5)

        if(tiro_x >= 570){
            $('#tiro').remove()
        }
    }
}

function colisao(){
    var p_tiro_nave = $('#tiro').collision('#inimigo')
    var p_atinge_inimigo =$('#player').collision('#inimigo')
    var p_atinge_tanque =$('#player').collision('#tanque')
    var p_tiro_tanque =$('#tiro').collision('#tanque')
    

    if (p_tiro_nave.length >0){
        $('#tiro').remove()
            var i_x = parseInt($('#inimigo').css('left'))
            var i_y = parseInt($('#inimigo').css('top'))
            $('#inimigo').remove()
            $('#areaJogo').append('<div id="explosao"</div>')
            explodenave.play() 
            $('#explosao').css('top', i_y )
            $('#explosao').css('left', i_x ) 
            pontos += f_nave  
            setTimeout(function(){
                $('#explosao').remove()
            },2000)
                     
    }
    if (p_tiro_tanque.length >0){
        $('#tiro').remove()
            var i_x = parseInt($('#tanque').css('left'))
            var i_y = parseInt($('#tanque').css('top'))
            $('#tanque').remove()
            $('#areaJogo').append('<div id="explosao"</div>')
            explodenave.play() 
            $('#explosao').css('top', i_y )
            $('#explosao').css('left', i_x ) 
            setTimeout(function(){
                $('#explosao').remove()
            },2000)           
        }
    if (p_atinge_inimigo.length>0){
        diminuividaplayer()
    }
    if (p_atinge_tanque.length>0){        
        diminuividaplayer()
    }
}

function diminuividaplayer(){
    vida--
    var posicao = "0px 52px"
    switch (vida) {

        case 4:{
            posicao = "0px 52px"          
            break;}
        case 3:{
            posicao = "118px 52px"          
            break;}
        case 2:{
            posicao = "234px 52px"          
            break;}
        case 1:{
            posicao = "350px 52px"          
            break; }  
    
        default:{
            $('#vida').remove()
            $('#player').remove()
            $('#nave').remove()
            $('#tanque').remove()
            }
    }
    $('#vida').css("background-position", posicao)
}


function valida_pontuação(){
    if(pontos>0){
        var faseAtual = Math.floor(pontos / fase)
        var faseAnt = Math.floor(pontosAnterior / fase)

        if(faseAtual > faseAnt){
            vel +=1 
            console.log(vel)
        }

        pontosAnterior = pontos
        console.log(pontos)
        $('#pontos').innerHTML = pontos
    }
    
}
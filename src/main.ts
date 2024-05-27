import { Actor, CollisionType, Color, Direction, Engine, Text, Follow, HiddenEvent, Random, vec, Font } from "excalibur"


// 1 - Criar uma instancia de engine

const game = new Engine({
	width: 800,
	height: 600
})

// 2 - Criar barra do player
const barra = new Actor ({
	x: 150,
	y: game.drawHeight - 60,
	width: 200,
	height: 20,
	color: Color.Chartreuse,
	name: "BarraJogador"
})
barra.body.collisionType  = CollisionType.Fixed


game.add(barra)

// 3 - Movimentar a barra de acordo com o mouse
game.input.pointers.primary.on("move", (event) => {
	barra.pos.x = event.worldPos.x
})


//  4 - Criar Actor Bolinha
const bolinha = new Actor
({
	x: 100,
	y: 200,
	radius: 10,
	color: Color.Red
})
bolinha.body.collisionType = CollisionType.Passive
// 5 - Criar movimentação da bolinha
const VelocidadeBolinha = vec	(150, 150)
setTimeout( () => 
{
	bolinha.vel = VelocidadeBolinha
}, 1000)

bolinha.on("postupdate", () => {
	// Se a bolinha colidir com o lado esquerdo
	if (bolinha.pos.x < bolinha.width / 2){
		bolinha.vel.x = VelocidadeBolinha.x * 2
	}

	// Se a bolinha colidir com o lado direito
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth){
		bolinha.vel.x = VelocidadeBolinha.x * -2
	}

	// Se a bolinha colidir com o topo
	if (bolinha.pos.y < bolinha.height / 2){
		bolinha.vel.y = VelocidadeBolinha.y * 2
	}
	
})

game.add(bolinha)


//  7 - Criar os blocos
const padding = 20
const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const CorBloco = [Color.Red, Color.Orange, Color.Yellow]
const LarguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const AlturaBloco = 30

const listaBlocos: Actor[] = []

//  Renderização dos bloquinhos


//  Renderiza 3 linhas
for(let j = 0; j < linhas; j++){

	// Renderiza 5 bloquinhos
	for( let i = 0; i < colunas; i++)
	{
		listaBlocos.push(
			new Actor({
				x: xoffset + i * (LarguraBloco + padding) + padding,
				y: yoffset + j * (AlturaBloco + padding) + padding,
				width: LarguraBloco,
				height: AlturaBloco,
				color: CorBloco [j]
			})
		)
		
	}
}


listaBlocos.forEach	( bloco => {
	bloco.body.collisionType = CollisionType.Active
	game.add(bloco)
})

let pontos: 0

const textoPontos = new Text({
	text: "Hello World",
	font: new Font ({size: 20})
})
const objetoTexto = new Actor ({
	x: game.drawWidth - 80,
	y: game.drawHeight - 15	
})

objetoTexto.graphics.use(textoPontos)

game.add(objetoTexto)


let colidindo: boolean = false

bolinha.on("collisionstart",  (event) => {

	// Se o elemento colidido for um da lista de blocos (Destrutível)
	if (listaBlocos.includes(event.other)) {
		// Destruir bloco colidido
		event.other.kill()
		
	}


	let intersecao = event.contact.mtv.normalize()

	if (!colidindo){
		colidindo = true
		if (Math.abs(intersecao.x) > Math.abs(intersecao.y)){
			bolinha.vel.x = bolinha.vel.x * -1
		} else {
			bolinha.vel.y = bolinha.vel.y  * -1
		}
	}
})


bolinha.on("collisionend", () => {
	colidindo  = false
})

bolinha.on("exitviewport", () => {
	alert("E morreu")
	window.location.reload()
})
game.start()
import { Actor, CollisionType, Color, Direction, Engine, Follow, HiddenEvent, Random, vec } from "excalibur"


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
	color: Color.Chartreuse
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

	// Se a bolinha colidir com a parte inferior
	if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight){
			bolinha.pos.x = 100,
			bolinha.pos.y = 200

	}
})

game.add(bolinha)


//  7 - Criar os blocos
const padding = 20
const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const CorBloco = [Color.Violet, Color.Orange, Color.Yellow]
const LarguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const AlturaBloco = 30

const listaBlocos: Actor[] = []

game.start()
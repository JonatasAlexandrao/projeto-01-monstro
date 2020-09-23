new Vue({
    el: '#app',
    data: {
        playerLife: 0,
        monsterLife: 100,
        running: false,
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        },

    },
    methods: {
        startGame() {

            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
        },
        attack(especial) {
            this.attackPlayer(especial)
            this.attackMonster()

            
        },
        attackPlayer(especial) {
            if(especial){
                this.monsterLife -= this.getRandom(10, 15)
            }
            else{
                this.monsterLife -= this.getRandom(5, 10)
            }

            if(this.monsterLife < 0)
                this.monsterLife = 0
        },
        attackMonster() {
            this.playerLife -= this.getRandom(5, 13)
            if(this.playerLife < 0)
                this.playerLife = 0
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        heal() {
            this.playerLife += this.getRandom(8, 15)
            //const heal = this.getRandom(5, 15)
            //this.playerLife = Math.min(this.playerLife + heal, 100)
            this.attackMonster()
            if(this.playerLife > 100)
                this.playerLife = 100
        }

    },
    watch: {
       hasResult(value) {
           if(value) this.running = false
       } 
    }
})
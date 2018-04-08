/**
 * Created by 95112 on 2018/4/2.
 */
var ballX = 0;
var ballY = 0;
var xDel = 0;
var yDel = 5;
var board = null;
var rabbitBall = null;
var boardSpeed = 0;


var JumpRabbitLayer = cc.Layer.extend({
    size:null,
    boardWidth:0,
    win:null,
    lose:null,
    radishGroup:null,
    amountRadish:10,
    key:0,
    ctor:function(){
        this._super();
        this.radishGroup = [];
        var winBoard = new cc.MenuItemFont("恭喜全部过关,返回主菜单",this.nextGame,this);
        winBoard.fontSize = 33;
        var falseBoard = new cc.MenuItemFont("重新开始",this.restartGame,this);
        falseBoard.fontSize = 33;
        this.win = new cc.Menu(winBoard);
        this.lose = new cc.Menu(falseBoard);
        this.amountRadish =5;
        xDel =0;
        this.size = cc.director.getWinSize();
        var bgSprite =new cc.Sprite(res.jumpBackground);
        bgSprite.attr({
            x:this.size.width/2,
            y:this.size.height/2,
            scale:1.5
        });
        this.addChild(bgSprite);
        rabbitBall = new cc.Sprite(res.rabbitJump);
        rabbitBall.attr({
            x:this.size.width/2,
            y:this.size.height/2,
            scale:0.4
        });
        board = new cc.Sprite(res.board);
        board.scale = 0.5;
        board.x = this.size.width/2;
        board.y = this.size.height/15;
        this.boardWidth = board.width;
        for(var i =0; i< this.amountRadish;i++){
            this.addRandomRadish();
        }
        var backHome = new BackSprite(res.backHome);
        backHome.attr({
            x:size.width-backHome.width/5,
            y:size.height-backHome.height/5,
            scale:0.4
        });
        this.addChild(backHome);
        this.scheduleUpdate();
        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,
                onKeyPressed:function(keyCode,event){
                    if(keyCode == cc.KEY.left){
                        boardSpeed = -10;
                    }else if(keyCode == cc.KEY.right){
                        boardSpeed = 10;
                    }else{
                        boardSpeed = 0;
                    }
                },
                onKeyReleased:function(keyCode,event){
                    boardSpeed = 0;
                }
            },this)
        }
    },
    restartGame:function(){
        cc.director.runScene(new JumpRabbitScene());
    },
    nextGame:function(){
        cc.director.runScene(new MenuScene());
    }
    ,
    update:function(){
        this.removeBall();
        this.addBall();
        this.removeBoard();
        this.addBoard();
    },
    addBoard:function(){
        if (board.x + boardSpeed > 0 && board.x + boardSpeed < this.size.width)
            board.x = board.x + boardSpeed;
        this.addChild(board);
    },
    removeBoard:function(){
        board.removeFromParent();
    },
    addBall:function(){
        if (rabbitBall.x <= 0 || rabbitBall.x >= this.size.width)
            xDel = -xDel;
        if (rabbitBall.y >= this.size.height)
            yDel = -yDel;
        if (Math.abs(board.x - rabbitBall.x)<this.boardWidth/2 && rabbitBall.y -board.y <30 && rabbitBall.y > board.y){
            yDel = -yDel;
            xDel = xDel + boardSpeed/2;
        }
        rabbitBall.x = rabbitBall.x + xDel;
        rabbitBall.y = rabbitBall.y + yDel;
        this.addChild(rabbitBall);
    },
    removeBall:function(){
        rabbitBall.removeFromParent();
        for (var i =0 ; i<this.radishGroup.length;i++){
            if(Math.abs(rabbitBall.x - this.radishGroup[i].x)< 20 && Math.abs(rabbitBall.y - this.radishGroup[i].y)<20){
                this.radishGroup[i].removeFromParent();
                this.radishGroup[i] = undefined;
                this.radishGroup.splice(i,1);
                i = i-1;
                this.amountRadish -= 1
                yDel = -yDel;
            }
        }
        if (this.amountRadish == 0 && this.key==0){
            this.addChild(this.win);
            rabbitBall = new cc.Sprite();
            this.key += 1;
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect("res/sounds/win.wav",false);
        }
        if(rabbitBall.y < 0){
            rabbitBall = new cc.Sprite();
            this.addChild(this.lose);
        }
    },
    addRandomRadish:function(){
        var radish = new cc.Sprite(res.radish);
        radish.attr({
            x:radish.width/2 + this.size.width/1.5*cc.random0To1(),
            y:radish.height/2 + this.size.height/1.5*cc.random0To1(),
            scale:0.3
        });
        this.addChild(radish);
        this.radishGroup.push(radish);
    },
});

var JumpRabbitScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new JumpRabbitLayer();
        this.addChild(layer);
    }
})
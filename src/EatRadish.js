/**
 * Created by 95112 on 2018/4/1.
 */
var rabbit = null;
var size = null;
var xStep = null;
var yStep = null;
var amountRadish = 5;
var cave = null;
var winBoard = null;
var EatRadishLayer = cc.Layer.extend({
    radishGroup:null,
    winBoard:null,
    key:0,
    lose:null,
    timeout:10,
    timeoutLabel:null,
    ctor:function(){
        this._super();
        this.radishGroup = [];
        amountRadish = 5;
        var Board = new cc.MenuItemFont("恭喜过关，进入下一关",this.nextGame,this);
        Board.fontSize = 33;
        winBoard =new cc.Menu(Board);
        size = cc.director.getWinSize();


        var bgSprite = new cc.Sprite(res.grassBackground);

        xStep = size.width/15;
        yStep = size.height/15;
        bgSprite.attr({
            x:size.width/2,
            y:size.height/2,
            scale:1.7
        });
        this.addChild(bgSprite);
        cc.audioEngine.playMusic("res/sounds/bgm1.wav",true);
        rabbit = new cc.Sprite(res.rabbitWalk)
        rabbit.attr({
            x:50,
            y:50,
            scale:0.5
        });
        for(var i =0; i< amountRadish;i++){
            this.addRandomRadish();
        }
        this.addCave();
        var backHome = new BackSprite(res.backHome);
        backHome.attr({
           x:size.width-backHome.width/5,
            y:size.height-backHome.height/5,
            scale:0.4
        });
        this.addChild(backHome);
        var falseBoard = new cc.MenuItemFont("重新开始",this.restartGame,this);
        falseBoard.fontSize = 33;
        this.lose = new cc.Menu(falseBoard);

        this.timeout = 10;
        this.timeoutLabel = cc.LabelTTF.create("剩余时间 : "+this.timeout,"Arial",30);
        this.timeoutLabel.attr({
            x:size.width/2,
            y:size.height-50,
        });
        this.addChild(this.timeoutLabel);

        this.schedule(this.timer, 1,this.timeout,1);


        this.scheduleUpdate();
        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,
                onKeyReleased:function(keyCode,event){
                    if (keyCode == cc.KEY.right && (rabbit.x + xStep)<size.width){
                        rabbit.scaleX=0.5;
                        rabbit.x = rabbit.x + xStep;
                    }else if(keyCode == cc.KEY.left && (rabbit.x - xStep)>0){
                        rabbit.scaleX=-0.5;
                        rabbit.x = rabbit.x - xStep;
                    }else if(keyCode == cc.KEY.up && (rabbit.y + yStep) <size.height){
                        rabbit.y = rabbit.y + yStep;
                    }else if(keyCode == cc.KEY.down && (rabbit.y - yStep) > 0){
                        rabbit.y = rabbit.y - yStep;
                    }
                }
            },this);
        }
        return true;
    },
    timer:function(){
        if(this.timeout>0) {
            this.timeout -= 1;
            this.timeoutLabel.setString("剩余时间 : " + this.timeout);
        }else if(this.key==0){
            rabbit.removeFromParent();
            rabbit = new cc.Sprite();
            this.addChild(this.lose);
            this.unscheduleUpdate(this.update());
        }
    }
    ,
    restartGame:function(){
        cc.director.runScene(new EatRadishScene())
    }
    ,
    nextGame:function(){
        cc.director.runScene(new EatRadishScene1());
    }
    ,
    update:function(){
        this.removeRabbit();
        this.drawRabbit();
    }
    ,
    drawRabbit:function(){
        this.addChild(rabbit)
    },
    removeRabbit:function(){
        rabbit.removeFromParent();
        for(var i = 0; i<this.radishGroup.length; i++){
            if (Math.abs(rabbit.x - this.radishGroup[i].x)<xStep && Math.abs(rabbit.y - this.radishGroup[i].y)<yStep){
                this.radishGroup[i].removeFromParent();
                this.radishGroup[i] = undefined;
                this.radishGroup.splice(i,1);
                i = i-1;
                amountRadish -= 1;

                cc.audioEngine.playEffect("res/sounds/eatRadish.wav",false);
            }
        }
        if(amountRadish==0 && Math.abs(rabbit.x - cave.x )<xStep&&Math.abs(rabbit.y-cave.y)<yStep && this.key == 0){
            this.addChild(winBoard);
            rabbit = new cc.Sprite();
            this.key +=1;
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect("res/sounds/win.wav",false);
        }
    },
    addRandomRadish:function(){
        var radish = new cc.Sprite(res.radish);
        radish.attr({
            x:radish.width/2 + size.width/1.5*cc.random0To1(),
            y:radish.height/2 + size.height/1.5*cc.random0To1(),
            scale:0.3
        });
        this.addChild(radish);
        this.radishGroup.push(radish);
    },
    addCave:function(){
        cave = new cc.Sprite(res.cave);
        cave.attr({
            x:cave.width/2 + size.width/1.5*cc.random0To1(),
            y:cave.height/2 + size.height/1.5*cc.random0To1(),
            scale:0.6
        });
        this.addChild(cave);
    }
}) ;
var EatRadishScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new EatRadishLayer();
        this.addChild(layer);
    }
})
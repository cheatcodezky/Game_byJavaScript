/**
 * Created by 95112 on 2018/4/4.
 */
/**
 * Created by 95112 on 2018/4/4.
 */
var puzzleGroup;
var click;
var size;
var which;
var number;
var over;
var winBoard = null;
var distance ;
var PuzzleLayer2 = cc.Layer.extend({
    ctor:function(){
        this._super();
        size = cc.winSize;
        over = false;
        puzzleGroup = new Array();
        distance = 100;
        which = null;
        click = false;
        number = 7;
        var Board = new cc.MenuItemFont("恭喜过关，进入下一关",this.nextGame,this);
        Board.fontSize = 33;
        winBoard =new cc.Menu(Board);

        var bgSprite = new cc.Sprite(res.puzzleBackground);
        bgSprite.attr({
            x:size.width/2,
            y:size.height/2,
        });
        this.addChild(bgSprite);
        cc.audioEngine.playMusic("res/sounds/bgm1.wav",true);
        puzzleGroup[0] = new cc.Sprite(res.sAnswer);
        puzzleGroup[0].attr({
            x:size.width/2,
            y:size.height/2,
            scale:0.5
        });
        for(var i = 1 ; i <= number;i++){
            puzzleGroup[i] = new cc.Sprite("res/second/s"+i+".png");
            puzzleGroup[i].attr({
                x:i*size.width/(number+1),
                y:70,
                scale:0.4,
            });
            this.addChild(puzzleGroup[i]);
        }

        var backHome = new BackSprite(res.backHome);
        backHome.attr({
            x:size.width-backHome.width/5,
            y:size.height-backHome.height/5,
            scale:0.4
        });
        this.addChild(backHome);
        this.scheduleUpdate();
        if('mouse' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:function(event){
                    click = true;
                    var pos = event.getLocation();
                    var minX = 1000;
                    var minY = 1000;
                    var distanceX ,distanceY;
                    for ( var i = 1 ; i<= number;i++){
                        distanceX = Math.abs(puzzleGroup[i].x - pos.x);
                        distanceY =  Math.abs(puzzleGroup[i].y - pos.y);
                        if(distanceX <puzzleGroup[i].width/4 &&distanceY <puzzleGroup[i].height/4 ){
                            if((Math.pow(distanceX,2) + Math.pow(distanceY,2)) < (Math.pow(minX,2)+Math.pow(minY,2))){
                                which = i;
                                minX = distanceX;
                                minY = distanceY;
                            }

                        }
                    }
                },
                onMouseMove:function(event){
                    var pos = event.getLocation();
                    if (click && which!=null){
                        puzzleGroup[which].attr({
                            x:pos.x,
                            y:pos.y,
                        })
                    }
                },
                onMouseUp:function(event){
                    click =false;
                    which = null;
                    cc.audioEngine.playEffect("res/sounds/puzzleMusic.wav",false);
                }
            },this);
        }
    },
    nextGame:function(){
        cc.director.runScene(new PuzzleScene3());
    },
    update:function(){
        this.removeItems();
        this.addItems();
    }
    ,
    addItems:function(){
        for  (var i =1 ; i <=number;i++){
            this.addChild(puzzleGroup[i]);
        }
    },
    removeItems:function() {
        for (var i = 1; i <= number; i++) {
            puzzleGroup[i].removeFromParent();
        }
        if(puzzleGroup[1].y>puzzleGroup[4].y && puzzleGroup[1].x < puzzleGroup[3].x && (puzzleGroup[1].y -puzzleGroup[4].y)<distance &&(puzzleGroup[3].x-puzzleGroup[1].x)<distance) {
            if (puzzleGroup[2].y > puzzleGroup[7].y && (puzzleGroup[2].y - puzzleGroup[7].y) < distance) {
                if (puzzleGroup[6].x > puzzleGroup[3].x && (puzzleGroup[6].x - puzzleGroup[3].x) < distance) {
                    if (puzzleGroup[5].x > puzzleGroup[7].x && puzzleGroup[5].y < puzzleGroup[6].y && (puzzleGroup[5].x - puzzleGroup[7].x ) < distance && (puzzleGroup[6].y - puzzleGroup[5].y) < distance) {
                        if (!over){
                            console.log("win!!!!!!!!!!!!");
                            for(var i =1 ; i<=number;i++){
                                puzzleGroup[i] = new cc.Sprite();

                            }
                            cc.audioEngine.stopMusic();
                            cc.audioEngine.playEffect("res/sounds/win.wav",false);
                            this.addChild(puzzleGroup[0]);
                            this.addChild(winBoard);
                            over = true;
                        }
                    }
                }
            }
        }
    }

});

var PuzzleScene2 = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new PuzzleLayer2();
        this.addChild(layer);
    }
});
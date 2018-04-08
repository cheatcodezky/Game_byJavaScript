/**
 * Created by 95112 on 2018/4/1.
 */
var StartLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var menuFont = new cc.MenuItemFont("开始游戏",this.startGame,this);
        menuFont.fontSize = 33;
        var menu = new cc.Menu(menuFont);
        this.addChild(menu);
    },
    startGame:function(){
        cc.director.runScene(new PuzzleScene());
    }
});
var StartScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var startLayer = new StartLayer();
        this.addChild(startLayer);
    }
});
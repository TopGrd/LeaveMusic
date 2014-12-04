require.config({
    paths:{
        muplayer: 'bower_components/muplayer/dist/'
    }
});
require([
    'muplayer/player'
],function(Player) {
    var player = new Player({
            baseDir: 'bower_components/muplayer/dist/'
        }),
        $player = $('.player'),
        $ctrlBtn =$player.find('.ctrl'),
        $prevBtn = $('.left'),
        $nextBtn = $('.right'),
        $modeBtn = $('.mode'),
        $range = $('#range');
    /*                handleTimeupdate = function () {
     var pos = player.curPos(),
     duration = player.duration();
     $progress.slider('option', 'value', duration ? pos / duration * 1000 :0);

     }; */
    player.add([
        'music/dm.mp3',
        'music/onlyyou.mp3'
    ]);
    player.play();
    $prevBtn.click(function () {
        if($prevBtn.hasClass('leftbg1')){
            $prevBtn.removeClass('leftbg1').addClass('leftbg2');

        }
        player.prev();
        setTimeout(function(){
            $prevBtn.removeClass('leftbg2').addClass('leftbg1');
        },100);

        /*$prevBtn.removeClass('leftbg2').addClass('leftbg1');*/
    });
    $nextBtn.click(function(){
        if($nextBtn.hasClass('rightbg1')){
            $nextBtn.removeClass('rightbg1').addClass('rightbg2');
        }
        player.next();
        setTimeout(function(){
            $nextBtn.removeClass('rightbg2').addClass('rightbg1');
        },100);
    });

    $('.ctrl').hover(function () {
        $('.ctrl').addClass("ctrl-p");
    }, function () {
        $('.ctrl').removeClass("ctrl-p");
    });
    $ctrlBtn.click(function () {
        if ($ctrlBtn.hasClass('ctrl-s')) {
            $ctrlBtn.removeClass('ctrl-s').addClass('ctrl-p');
            player.play();
            $('.ml').css('animation-play-state','paused').css('-webkit-animation-play-state','running');


        } else if ($ctrlBtn.hasClass('ctrl-p')) {
            $ctrlBtn.removeClass('ctrl-p').addClass('ctrl-s');
            player.pause();
            $('.ml').css('animation-play-state','paused').css('-webkit-animation-play-state','paused');
        }
    });
    var modes = ['loop', 'list-random'],
        modeIndex = 0;
    $modeBtn.click(function () {
        var mode = modes[++modeIndex % 2];
        player.setMode(mode);
        if (mode === 'loop') {
            $modeBtn.removeClass('mode-list').addClass('mode-loop');
        } else {
            $modeBtn.removeClass('mode-loop').addClass('mode-list');
        }
    });

    $range.mouseup(function setValue(){
        var value =$range.val();
        player.setVolume(value);
        $range.val(value);
        if(value==0){
            player.setMute(true);
        }else{
            player.setMute(false);
        }

    });
});

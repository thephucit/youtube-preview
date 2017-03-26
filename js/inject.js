/**
 * @author: The Phuc
 * @package: inject share link to every youtube video
 * @since: 2017-03-23
 */
var __clas = 'youtube-preview',
    __icon = 'images/icon.png',
    __idna = 'id-video';

var injectPreview1 = function(__ele) {
    let __livi = window.document.querySelectorAll(__ele);
    let __leli = __livi.length;
    for( let i = 0; i < __leli; ++i ) {
        let __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-grid.yt-lockup-video.clearfix');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-grid.yt-lockup-video.vve-check.clearfix');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-tile.yt-lockup-video.clearfix');
        if(!__fiid) return;

        let __plin = __livi[i].querySelector('div.yt-thumb.video-thumb'),
            __lipe = window.document.createElement('span'),
            __teli = window.document.createTextNode('Preview'),
            __idvi = __fiid.getAttribute('data-context-item-id');
        if(__plin) {
            __lipe.appendChild(__teli);
            __lipe.setAttribute(__idna, __idvi);
            __lipe.className = __clas;
            __lipe.onclick = function(e) {
                e.preventDefault();
                console.log(this.getAttribute(__idna));
            };
            if(!__livi[i].querySelector('span[class="'+__clas+'"]'))
                __plin.appendChild(__lipe);
        }
    }
};

var __injectAll = function() {
    injectPreview1('li.yt-shelf-grid-item');
    injectPreview1('li.expanded-shelf-content-item-wrapper');
    injectPreview1('li.yt-shelf-grid-item.yt-uix-shelfslider-item');
};

__injectAll();
document.addEventListener('DOMContentLoaded', function(){
    __injectAll();
});

window.onscroll = function(ev) {
    __injectAll();
};

let __btn_next = window.document.querySelectorAll('button.yt-uix-button.yt-uix-button-size-default.yt-uix-button-shelf-slider-pager.yt-uix-shelfslider-next');
let __btn_prev = window.document.querySelectorAll('button.yt-uix-button.yt-uix-button-size-default.yt-uix-button-shelf-slider-pager.yt-uix-shelfslider-prev');
for (var i = 0; i < __btn_next.length; ++i)
    __btn_next[i].onclick = __injectAll();

for (var i = 0; i < __btn_prev.length; ++i)
    __btn_prev[i].onclick = __injectAll();
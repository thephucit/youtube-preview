/**
 * @author: The Phuc
 * @package: inject share link to every youtube video
 * @since: 2017-03-23
 */
if(typeof __clas === 'undefined')
    var __clas = 'youtube-preview';
if(typeof __idna === 'undefined')
    var __idna = 'id-video';
if(typeof __idpe === 'undefined')
    var __idpe = 'youtube-preview-ext';
if(typeof __text === 'undefined') {
    var __regi = window.document.querySelector('span.content-region'),
        __text = '';
    if(__regi && __regi.textContent === 'VN')
        __text = 'Xem nhanh';
    else
        __text = 'Preview';
}

var injectPreview1 = function(__ele) {
    var __livi = window.document.querySelectorAll(__ele),
        __leli = __livi.length;
    for( var i = 0; i < __leli; ++i ) {
        var __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-grid.yt-lockup-video.clearfix');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-grid.yt-lockup-video.vve-check.clearfix');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-tile.yt-lockup-video.clearfix');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-tile.yt-lockup-video.vve-check.clearfix');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.clearfix.yt-lockup-video.yt-lockup-grid');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.clearfix.yt-lockup-video.yt-lockup-grid.vve-check');
        if(!__fiid)
            __fiid = __livi[i].querySelector('div.yt-lockup.clearfix.yt-lockup-video.yt-lockup-tile');
        if(!__fiid) continue;
        var __plin = __livi[i].querySelector('div.yt-thumb.video-thumb'),
            __lipe = window.document.createElement('span'),
            __teli = window.document.createTextNode(__text);
        if(!__plin)
            __plin = __livi[i].querySelector('span.spf-link.ux-thumb-wrap.contains-addto');
        if(__plin) {
            let __idvi = __fiid.getAttribute('data-context-item-id');
            __lipe.appendChild(__teli);
            __lipe.setAttribute(__idna, __idvi);
            __lipe.className = __clas;
            __lipe.onclick = function(e) {
                e.preventDefault();
                let __idge = this.getAttribute(__idna);
                let __ifra =  window.document.createElement('iframe');
                    __ifra.width = 500;
                    __ifra.height = 315;
                    __ifra.frameborder = 0;
                    __ifra.allowfullscreen = true;
                    __ifra.id = __idpe;
                    __ifra.src = 'https://www.youtube.com/embed/' + __idge + '?autoplay=1';
                if(window.document.getElementById(__idpe))
                    window.document.getElementById(__idpe).remove();
                window.document.body.appendChild(__ifra);
            };
            if(!__livi[i].querySelector('span[class="'+__clas+'"]'))
                __plin.appendChild(__lipe);
        }
    }
};

window.document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) isEscape = (evt.key == "Escape" || evt.key == "Esc");
    else isEscape = (evt.keyCode === 27);
    if (isEscape) window.document.getElementById(__idpe).remove();
};

var __injectAll = function() {
    injectPreview1('li.yt-shelf-grid-item');
    injectPreview1('li.expanded-shelf-content-item-wrapper');
    injectPreview1('li.yt-shelf-grid-item.yt-uix-shelfslider-item');
    injectPreview1('li.channels-content-item.yt-shelf-grid-item.yt-uix-shelfslider-item');
    injectPreview1('li.feed-item-container.yt-section-hover-container.legacy-style');
};

if(typeof __event == 'undefined')
    var __event = ['onload', 'scroll'];
if(typeof __btn_next == 'undefined')
    var __btn_next = window.document.querySelectorAll('button.yt-uix-button.yt-uix-button-size-default.yt-uix-button-shelf-slider-pager.yt-uix-shelfslider-next');
if(typeof __btn_prev == 'undefined')
    var __btn_prev = window.document.querySelectorAll('button.yt-uix-button.yt-uix-button-size-default.yt-uix-button-shelf-slider-pager.yt-uix-shelfslider-prev');

for (var i = 0; i < __btn_next.length; ++i)
    __btn_next[i].onclick = __injectAll();
for (var i = 0; i < __btn_prev.length; ++i)
    __btn_prev[i].onclick = __injectAll();
for(__e of __event)
    document.addEventListener(__e, function(e) { __injectAll(); }, true);
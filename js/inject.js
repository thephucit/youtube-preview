/**
 * @author: The Phuc
 * @package: inject preview link to every youtube video
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

var dragWindow = function(id) {
    let selected = null,
    x_pos = 0, y_pos = 0,
    x_elem = 0, y_elem = 0;
    function _drag_init(elem) {
        selected = elem;
        x_elem = x_pos - selected.offsetLeft;
        y_elem = y_pos - selected.offsetTop;
    }
    function _move_elem(e) {
        x_pos = document.all ? window.event.clientX : e.pageX;
        y_pos = document.all ? window.event.clientY : e.pageY;
        if (selected !== null) {
            selected.style.left = (x_pos - x_elem) + 'px';
            selected.style.top = (y_pos - y_elem) + 'px';
        }
    }
    function _destroy() {
        selected = null;
    }
    document.getElementById(id).onmousedown = function () {
        _drag_init(this);
        return false;
    };
    document.onmousemove = _move_elem;
    document.onmouseup = _destroy;
};

var openPreviewWindow = function(__idge, __title) {
    let window_preview = window.document.createElement('div');
        window_preview.id = __idpe;
        window_preview.setAttribute('style', 'right:10px;bottom:10px;');
    let window_video_content =
        '<div class="titlebar">'+
            '<div class="buttons">'+
                '<div class="close">'+
                    '<a class="closebutton" href="javascript:void(0)"><span><strong>x</strong></span></a>'+
                '</div>'+
                '<div class="minimize">'+
                    '<a class="minimizebutton" href="javascript:void(0)"><span><strong>&ndash;</strong></span></a>'+
                '</div>'+
                '<div class="zoom">'+
                    '<a class="zoombutton" href="javascript:void(0)"><span><strong>+</strong></span></a>'+
                '</div>'+
            '</div>'+
            '<label class="title-preview">'+__title+'</label>'+
        '</div>'+
        '<div class="content">'+
            '<iframe width="550" height="355" src="https://www.youtube.com/embed/'+__idge+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'+
        '</div>';
    window_preview.innerHTML = window_video_content;
    if(window.document.getElementById(__idpe))
        window.document.getElementById(__idpe).remove();
    window.document.body.appendChild(window_preview);
    window.document.querySelector('div[class="close"]').addEventListener('click', function() {
        window.document.getElementById(__idpe).remove();
    });
    dragWindow(__idpe);
};

var injectPreview = function(__ele) {
    let __livi = window.document.querySelectorAll(__ele),
        __leli = __livi.length;
    for( let i = 0; i < __leli; ++i ) {
        let __h3 = __livi[i].querySelector('h3'),
            __a  = __h3.querySelector('a'),
            __ti = __a.title;
        let __fiid = __livi[i].querySelector('div.yt-lockup.yt-lockup-grid.yt-lockup-video.clearfix');
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
        let __plin = __livi[i].querySelector('div.yt-thumb.video-thumb'),
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
                openPreviewWindow(__idge, __ti);
            };
            if(!__livi[i].querySelector('span[class="'+__clas+'"]'))
                __plin.appendChild(__lipe);
        }
    }
};

var injectPreviewSearch = function(__ele) {
    let __livi = window.document.querySelectorAll(__ele),
        __leli = __livi.length;
    for( let i = 0; i < __leli; ++i ) {
        let __h3 = __livi[i].querySelector('h3'),
            __a  = __h3.querySelector('a'),
            __ti = __a.title;
        let __plin = __livi[i].querySelector('span.yt-thumb-simple'),//div.yt-thumb.video-thumb
            __lipe = window.document.createElement('span'),
            __teli = window.document.createTextNode(__text);
        if(!__plin)
            __plin = __livi[i].querySelector('span.yt-thumb-simple');
        if(__plin) {
            let __idvi = __livi[i].getAttribute('data-context-item-id');
            __lipe.appendChild(__teli);
            __lipe.setAttribute(__idna, __idvi);
            __lipe.setAttribute('title-video', __ti);
            __lipe.className = __clas;
            __lipe.onclick = function(e) {
                e.preventDefault();
                let __idge = this.getAttribute(__idna);
                let __titl = this.getAttribute('title-video');
                openPreviewWindow(__idge, __titl);
            };
            let img = __plin.querySelector('img');
            if(!__livi[i].querySelector('span[class="'+__clas+'"]'))
                __plin.insertBefore(__lipe, img);
        }
    }
};

window.document.onkeydown = function(evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) isEscape = (evt.key == "Escape" || evt.key == "Esc");
    else isEscape = (evt.keyCode === 27);
    isEscape && window.document.getElementById(__idpe) !== null && window.document.getElementById(__idpe).remove();
};

var __injectAll = function() {
    injectPreview('li.yt-shelf-grid-item');
    injectPreview('li.expanded-shelf-content-item-wrapper');
    injectPreview('li.yt-shelf-grid-item.yt-uix-shelfslider-item');
    injectPreview('li.channels-content-item.yt-shelf-grid-item.yt-uix-shelfslider-item');
    injectPreview('li.feed-item-container.yt-section-hover-container.legacy-style');
    injectPreviewSearch('div.yt-lockup.yt-lockup-tile.yt-lockup-video.clearfix');
};
__injectAll();
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
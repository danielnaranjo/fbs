/* Modificado para mostrar solo en desktop */
if (window.screen.width > 900) {
  //
  UserVoice=window.UserVoice||[];
  (function(){var uv=document.createElement('script');
    uv.type='text/javascript';
    uv.async=true;
    uv.src='//widget.uservoice.com/fId7nAczMGhUDNd9Pbl9zw.js';
    var s=document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(uv,s)})();
    UserVoice.push(['set', {
      accent_color: '#448dd6',
      trigger_color: 'white',
      trigger_background_color: '#448dd6'
    }]);
  UserVoice.push(['identify', {}]);
  UserVoice.push(['addTrigger', { mode: 'satisfaction', trigger_position: 'bottom-right' }]);
  UserVoice.push(['autoprompt', {}]);
  //
}
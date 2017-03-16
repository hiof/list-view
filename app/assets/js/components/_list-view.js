(function(Hiof, undefined) {

  // Functions
  Hiof.getListViewData = function(lang, options = {}) {
    var data;
    if (typeof lang === 'undefined') {
      lang = 'no';
    }
    var pageTreeID = $('#list-view').attr('data-page-tree-id');

    let defaults = {
      url: '//www.hiof.no/api/v1/page-relationship/',
      id: pageTreeID,
      server: 'www2',
      footer: false
    }
    // Merge objects
    let settings = Object.assign(
      {},
      defaults,
      options
    );
    $.ajax({
      url: settings.url,
      method: 'GET',
      async: true,
      dataType: 'json',
      data: settings,
      success: function(data) {
        Hiof.appendListView(data);
      },
      error: function(data) {}

    });
  };


  Hiof.appendListView = function(data) {
    let ln = $('html').attr('lang');
    let templateSource = Hiof.Templates['list/list'],
        markup = templateSource(data);

    $('#list-view').append(markup);

  };



  // On document load
  $(function() {
    if ($('#list-view').length) {
      Hiof.getListViewData();
    }

  });

})(window.Hiof = window.Hiof || {});

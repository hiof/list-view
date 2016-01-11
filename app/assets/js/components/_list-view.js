(function(Hiof, undefined) {

  // Functions
  Hiof.getListViewData = function(lang, options = {}) {
    var data;
    if (typeof lang === 'undefined') {
      lang = 'no';
    }
    var pageTreeID = $('#list-view').attr('data-page-tree-id');

    let defaults = {
      url: 'http://hiof.no/api/v1/page-relationship/',
      id: pageTreeID,
      server: 'www2',
      footer: false
    }
    //console.log(settings);
    let settings = Object.assign(
      {},
      defaults,
      options
    );
    //console.log(settings);
    $.ajax({
      url: settings.url,
      method: 'GET',
      async: true,
      dataType: 'json',
      data: settings,
      success: function(data) {
        //console.log(data);
        Hiof.appendListView(data);
      },
      error: function(data) {}

    });
  };


  Hiof.appendListView = function(data) {
    let ln = $('html').attr('lang');

    //let uiText = Hiof.options.i18n[ln].jobs;
    ////debug(data);
    //// Add i18n to view
    //data.view = {};
    //data.view.title = uiText.title;
    //data.view.deadline = uiText.deadline;
    //data.view.description = uiText.description;
    //data.view.readmore = uiText.readmore;



    var templateSource = Hiof.Templates['list/list'],
    markup = templateSource(data);

    $('#list-view').append(markup);

  };



  // On document load
  $(function() {
    if ($('#list-view').length) {
      Hiof.getListViewData();
    }

  });

  //window.Hiof.getListViewData = getData();

})(window.Hiof = window.Hiof || {});

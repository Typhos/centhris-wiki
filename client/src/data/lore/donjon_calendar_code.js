// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/control.js
//
// copyright (c) 2014-2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// configuration

  var form_id = 'cal_gen';
  var calendar = {};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// initialize form

  function init_form () {
    $H(calendar_list).keys().each(function (name) {
      $('set_cal').insert(new_option(name,name));
    });
    $('set_cal').setValue('');
    $('events').checked = true;

    init_calendar();

    $('set_cal').observe('change',set_cal_reaction);
    $('year_len').observe('change',year_len_reaction);
    $('layout').observe('change',rebuild_calendar);
    $('events').observe('change',events_reaction);
    $('n_months').observe('change',n_months_reaction);
    $('week_len').observe('change',week_len_reaction);
    $('n_moons').observe('change',n_moons_reaction);
    $('json_data').observe('change',json_data_reaction);
    $('json_file').observe('change',json_file_reaction);

    $('decr_year').observe('click',decr_year);
    $('incr_year').observe('click',incr_year);
    $('first_day').observe('change',first_day_reaction);

    $('data_tab').observe('tab:active',function () {
      $('json_data').focus();
    });
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// init calendar

  function init_calendar () {
    random_config();
    clear_names();
    rebuild_alles();
  }
  function clear_names () {
    calendar['months']    = [];
    calendar['month_len'] = {};
    calendar['weekdays']  = [];
    calendar['moons']     = [];
    calendar['lunar_cyc'] = {};
    calendar['lunar_shf'] = {};
    calendar['notes']     = {};
  }
  function rebuild_alles () {
    update_calendar();
    rebuild_month_table();
    rebuild_weekday_table();
    rebuild_lunar_table();
    rebuild_calendar();
  }
  function update_calendar () {
    calendar['year_len']  = $('year_len').intValue();
    calendar['events']    = $('events').checked ? 1 : 0;
    calendar['n_months']  = $('n_months').intValue();
    calendar['week_len']  = $('week_len').intValue();
    calendar['n_moons']   = $('n_moons').intValue();
    calendar['year']      = $('year').intValue();
    calendar['first_day'] = $('first_day').intValue();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar reaction

  function set_cal_reaction () {
    var name; if (name = $('set_cal').getValue()) {
      if (name == 'Random') {
        random_calendar();
        update_calendar();
      } else {
        load_calendar(name);
      }
    } else {
      init_calendar();
    }
  }
  function load_calendar (name) {
    update_json_data(calendar_list[name]);
    json_data_reaction();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// json data reaction

  function json_data_reaction () {
    var data; if (data = $('json_data').getValue().evalJSON()) {
      $('year_len').setValue(data['year_len']);
      $('n_months').setValue(data['n_months']);
        calendar['months'] = load_array(data,'months',[]);
        calendar['month_len'] = load_array(data,'month_len',{});
      $('week_len').setValue(data['week_len']);
        calendar['weekdays'] = load_array(data,'weekdays',[]);
      $('n_moons').setValue(data['n_moons']);
        calendar['moons'] = load_array(data,'moons',[]);
        calendar['lunar_cyc'] = load_array(data,'lunar_cyc',{});
        calendar['lunar_shf'] = load_array(data,'lunar_shf',{});
      calendar['notes'] = load_array(data,'notes',{});

      if (data['events'] != undefined) {
        $('events').checked = (data['events'] == 1);
      }
      $('year').setValue(data['year']);
      $('first_day').setValue(data['first_day']);

      rebuild_alles();
    }
  }
  function load_array (data, key, dflt) {
    if (data[key]) {
      return data[key];
    } else {
      return dflt;
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// json file reaction

  function json_file_reaction () {
    var file; if (file = $('json_file').files[0]) {
      var reader = new FileReader();

      reader.onload = function (event) {
        var json; if (json = event.target.result) {
          $('json_data').setValue(json);
          json_data_reaction();
        }
      };
      reader.readAsText(file);
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// year len reaction

  function year_len_reaction () {
    var n_months = $('n_months').intValue();
    var year_len = check_int('year_len',n_months);

    update_calendar();
    scan_months();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// events reaction

  function events_reaction () {
    update_calendar();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// change year

  function decr_year () {
    var first_day = $('first_day').intValue();
    var week_len = calendar['week_len'];
    var adj = (calendar['year_len'] % week_len);
    var new_first = first_day - adj;
        new_first = ((new_first + week_len) % week_len);

    $('year').setValue($('year').intValue() - 1);
    $('first_day').setValue(new_first);

    update_calendar();
    rebuild_calendar();
  }
  function incr_year () {
    var first_day = $('first_day').intValue();
    var week_len = calendar['week_len'];
    var adj = (calendar['year_len'] % week_len);
    var new_first = first_day + adj;
        new_first = ((new_first + week_len) % week_len);

    $('year').setValue($('year').intValue() + 1);
    $('first_day').setValue(new_first);

    update_calendar();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// change first day

  function first_day_reaction () {
    update_calendar();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// rebuild calendar

  function rebuild_calendar () {
    var layout = $('layout').getValue();
    var tbody = Builder.node('tbody');

    init_layout();

    if (layout == 'block') {
      tbody = block_layout(tbody);
    } else if (layout == 'vertical') {
      tbody = vertical_layout(tbody);
    } else if (layout == 'text') {
      tbody = text_layout(tbody);
    } else {
      tbody = block_layout(tbody);
    }
    $('calendar').update(tbody);

    var list; if (list = $$('.note')) {
      list.each(function (div) {
        div.observe('click',popup_edit_note);
      });
    }
    update_calendar_json();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// update json data

  function update_calendar_json () {
    update_json_data({
      'year_len':       calendar['year_len'],
      'events':         calendar['events'],
      'n_months':       calendar['n_months'],
      'months':         calendar['months'],
      'month_len':      calendar['month_len'],
      'week_len':       calendar['week_len'],
      'weekdays':       calendar['weekdays'],
      'n_moons':        calendar['n_moons'],
      'moons':          calendar['moons'],
      'lunar_cyc':      calendar['lunar_cyc'],
      'lunar_shf':      calendar['lunar_shf'],
      'year':           calendar['year'],
      'first_day':      calendar['first_day'],
      'notes':          calendar['notes']
    });
  }
  function update_json_data (data) {
    var json = Object.toJSON(data);

    $('json_data').setValue(json);
    $('download_json').href = download_json(json);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// edit note

  function popup_edit_note (event) {
    var div = event.target;

    $('note_ymd').setValue(div.readAttribute('data-ymd'));
    $('note_text').setValue(div.innerHTML);

    $('save_note').observe('click',save_note);
    $('cancel_note').observe('click',cancel_note);

    $('edit_note').show();
    $('note_text').activate();
  }
  function save_note (event) {
    $('edit_note').hide();

    var ymd = $('note_ymd').getValue();
    calendar['notes'][ymd] = $('note_text').getValue();

    rebuild_calendar();
  }
  function cancel_note (event) {
    $('edit_note').hide();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// showtime

  document.observe('dom:loaded',init_form);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/calendars.js
//
// copyright (c) 2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// setting calendars

  var calendar_list = {
    'Earth': {"year_len":365,"n_months":12,"months":["January","February","March","April","May","June","July","August","September","October","November","December"],"month_len":{"January":31,"February":28,"March":31,"April":30,"May":31,"June":30,"July":31,"August":31,"September":30,"October":31,"November":30,"December":31},"week_len":7,"weekdays":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"n_moons":1,"moons":["Luna"],"lunar_cyc":{"Luna":29.53},"lunar_shf":{"Luna":20},"year":2017,"first_day":0},
    'Eberron': {"year_len":336,"n_months":12,"months":["Zarantyr","Olarune","Therendor","Eyre","Dravago","Nymm","Lharvion","Barrakas","Rhaan","Sypheros","Aryth","Vult"],"month_len":{"Zarantyr":28,"Olarune":28,"Therendor":28,"Eyre":28,"Dravago":28,"Nymm":28,"Lharvion":28,"Barrakas":28,"Rhaan":28,"Sypheros":28,"Aryth":28,"Vult":28},"week_len":7,"weekdays":["Sul","Mol","Zol","Wir","Zor","Far","Sar"],"n_moons":12,"moons":["Zarantyr","Olarune","Therendor","Eyre","Dravago","Nymm","Lharvion","Barrakas","Rhaan","Sypheros","Aryth","Vult"],"lunar_cyc":{"Zarantyr":28,"Olarune":35,"Therendor":42,"Eyre":49,"Dravago":56,"Nymm":63,"Lharvion":70,"Barrakas":77,"Rhaan":84,"Sypheros":91,"Aryth":98,"Vult":105},"lunar_shf":{"Zarantyr":0,"Olarune":1,"Therendor":1,"Eyre":2,"Dravago":2,"Nymm":2,"Lharvion":3,"Barrakas":3,"Rhaan":3,"Sypheros":3,"Aryth":4,"Vult":4},"year":998,"first_day":0},
    'Golarion': {"year_len":365,"n_months":12,"months":["Abadius","Calistril","Pharast","Gozran","Desnus","Sarenith","Erastus","Arodus","Rova","Lamashan","Neth","Kuthona"],"month_len":{"Abadius":31,"Calistril":28,"Pharast":31,"Gozran":30,"Desnus":31,"Sarenith":30,"Erastus":31,"Arodus":31,"Rova":30,"Lamashan":31,"Neth":30,"Kuthona":31},"week_len":7,"weekdays":["Moonday","Toilday","Wealday","Oathday","Fireday","Starday","Sunday"],"n_moons":1,"moons":["Somal"],"lunar_cyc":{"Somal":29.53},"lunar_shf":{"Somal":0},"year":4707,"first_day":0},
    'Greyhawk': {"year_len":364,"n_months":16,"months":["Needfest","Fireseek","Readying","Coldeven","Growfest","Planting","Flocktime","Wealsun","Richfest","Reaping","Goodmonth","Harvester","Brewfest","Patchwall","Ready'reat","Sunsebb"],"month_len":{"Needfest":7,"Fireseek":28,"Readying":28,"Coldeven":28,"Growfest":7,"Planting":28,"Flocktime":28,"Wealsun":28,"Richfest":7,"Reaping":28,"Goodmonth":28,"Harvester":28,"Brewfest":7,"Patchwall":28,"Ready'reat":28,"Sunsebb":28},"week_len":7,"weekdays":["Starday","Sunday","Moonday","Godsday","Waterday","Earthday","Freeday"],"n_moons":2,"moons":["Luna","Celene"],"lunar_cyc":{"Luna":28,"Celene":91},"lunar_shf":{"Luna":1,"Celene":43},"year":576,"first_day":0},
    'Random': {}
  };
  var rpc_url = '/fantasy/random/rpc.cgi';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// random calendar

  function random_calendar () {
    random_config();
    update_calendar();
    random_names();
  }
  function random_config () {
    $('year_len').setValue(random_number(300,400));
    $('n_months').setValue(random_number(5,10));
    $('week_len').setValue(random_number(5,10));
    $('n_moons').setValue(random_number(1,6));
    $('year').setValue(random_number(500,1500));
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// get random names via rpc

  function random_names () {
    var n_months = $('n_months').intValue();
    var week_len = $('week_len').intValue();
    var n_moons = $('n_moons').intValue();
    var n = (n_months + week_len + n_moons);
    var query = { 'type': 'Celestial Name', 'n': (n * 2) };

    var opts = { 'method': 'get', 'parameters': query,
      'onSuccess': function (req) { recv_names(req); },
      'onFailure': function (req) { rpc_error(req.statusText); },
      'onException': function (req,err) { rpc_error('System Error'); }
    };
    new Ajax.Request(rpc_url,opts);
  }
  function recv_names (req) {
    if (req.responseJSON) {
      list = req.responseJSON;
    } else if (req.responseText) {
      list = req.responseText.evalJSON();
    } else {
      return rpc_error('No response');
    }
    list = list.uniq();

    var n_months; if (n_months = calendar['n_months']) {
      calendar['months'] = list.splice(0,n_months);
    }
    var week_len; if (week_len = calendar['week_len']) {
      calendar['weekdays'] = list.splice(0,week_len);
    }
    var n_moons; if (n_moons = calendar['n_moons']) {
      calendar['moons'] = list.splice(0,n_moons);
    }
    rebuild_alles();
  }
  function rpc_error (string) {
    rebuild_alles();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/months.js
//
// copyright (c) 2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// number of months reaction

  function n_months_reaction () {
    var year_len = $('year_len').intValue();
    var n_months = check_int('n_months',1,year_len);

    update_calendar();
    scan_months();
    rebuild_month_table();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// scan months

  function scan_months () {
    var total_days = 0;
    var max_len = (calendar['year_len'] - (calendar['n_months'] - 1));

    calendar['months'] = [];
    calendar['month_len'] = {};

    var idx; for (idx = 0; idx < calendar['n_months']; idx++) {
      var name = month_name(idx);
      var len = month_len(idx,max_len);

      if (name) {
        calendar['months'][idx] = name;
        calendar['month_len'][name] = len;
      } else {
        calendar['month_len'][idx] = len;
      }
      total_days += len;
      max_len -= (len - 1);
    }
    if (total_days < calendar['year_len']) {
      var adj = (calendar['year_len'] - total_days);
      var idx = (calendar['n_months'] - 1);
      var in_len = $(sprintf('mon-%d-len',idx));
      var adj_len = in_len.intValue() + adj;

      in_len.setValue(adj_len);

      var name; if (name = month_name(idx)) {
        calendar['month_len'][name] = adj_len;
      } else {
        calendar['month_len'][idx] = adj_len;
      }
    }
    return total_days;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// query functions

  function month_name (idx) {
    var id = sprintf('mon-%d',idx);

    var field; if (field = $(id)) {
      return field.getValue();
    } else {
      return undefined;
    }
  }
  function month_len (idx, max_len) {
    var id = sprintf('mon-%d-len',idx);

    var field; if (field = $(id)) {
      return check_int(id,1,max_len);
    } else {
      return undefined;
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// rebuild month table

  function rebuild_month_table () {
    $('month_table').update('');
    var n_months = calendar['n_months'];
    var rem_days = calendar['year_len'];

    var idx; for (idx = 0; idx < n_months; idx++) {
      var meta = month_meta(idx);

      if (meta['len'] == 0) {
        meta['len'] = Math.floor(rem_days / (n_months - idx));
      }
      $('month_table').insert(new_month_row(idx,meta));

      $(sprintf('mon-%d',idx)).observe('change',month_name_reaction);
      $(sprintf('mon-%d-len',idx)).observe('change',month_len_reaction);

      rem_days -= meta['len'];
    }
    scan_months();
  }
  function new_month_row (idx, meta) {
    var list = [
      { 'id': sprintf('mon-%d',idx), 'value': meta['name'],
        'size': 20, 'placeholder': 'Name' },
      { 'id': sprintf('mon-%d-len',idx), 'value': meta['len'],
        'size': 5, 'className': 'right', 'note': 'days' }
    ];
    return input_row({},list);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// month reactions

  function month_name_reaction () {
    scan_months();
    rebuild_calendar();
  }
  function month_len_reaction () {
    scan_months();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// month list

  function month_list () {
    var list = [];

    var idx; for (idx = 0; idx < calendar['n_months']; idx++) {
      var meta = month_meta(idx);
      list.push(meta['desc']);
    }
    return list;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// month meta

  function month_meta (idx) {
    var name; if (name = calendar['months'][idx]) {
      var meta = { 'name': name, 'desc': name };

      if (calendar['month_len'][name]) {
        meta['len'] = calendar['month_len'][name];
      } else {
        meta['len'] = 0;
      }
      return meta;
    } else {
      var desc = sprintf('Month %d',(idx + 1));
      var meta = { 'name': '', 'desc': desc };

      if (calendar['month_len'][idx]) {
        meta['len'] = calendar['month_len'][idx];
      } else {
        meta['len'] = 0;
      }
      return meta;

    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/weekdays.js
//
// copyright (c) 2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// week length reaction

  function week_len_reaction () {
    var week_len = check_int('week_len',1);

    update_calendar();
    scan_weekdays();
    rebuild_weekday_table();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// scan weekdays

  function scan_weekdays () {
    calendar['weekdays'] = [];

    var idx; for (idx = 0; idx < calendar['week_len']; idx++) {
      var name; if (name = weekday_name(idx)) {
        calendar['weekdays'][idx] = name;
      }
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// query functions

  function weekday_name (idx) {
    var id = sprintf('wkd-%d',idx);

    var field; if (field = $(id)) {
      return field.getValue();
    } else {
      return undefined;
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// rebuild weekday table

  function rebuild_weekday_table () {
    $('weekday_table').update('');

    var idx; for (idx = 0; idx < calendar['week_len']; idx++) {
      var meta = weekday_meta(idx);
      $('weekday_table').insert(new_weekday_row(idx,meta));
      $(sprintf('wkd-%d',idx)).observe('change',weekday_name_reaction);
    }
    scan_weekdays();
    rebuild_first_select();
  }
  function new_weekday_row (idx, meta) {
    var list = [
      { 'id': sprintf('wkd-%d',idx), 'value': meta['name'],
        'size': 20, 'placeholder': 'Name' }
    ];
    return input_row({},list);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// weekday reactions

  function weekday_name_reaction () {
    scan_weekdays();
    rebuild_first_select();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// rebuild first select

  function rebuild_first_select () {
    var first_day = $('first_day').intValue();
    var list = weekday_list();

    $('first_day').update('');

    var idx; for (idx = 0; idx < calendar['week_len']; idx++) {
      $('first_day').insert(new_option(idx,list[idx]));
    }
    if (first_day) {
      $('first_day').setValue(first_day);
      calendar['first_day'] = first_day;
    } else {
      $('first_day').setValue(0);
      calendar['first_day'] = 0;
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// weekday list

  function weekday_list () {
    var list = [];

    var idx; for (idx = 0; idx < calendar['week_len']; idx++) {
      var meta = weekday_meta(idx);
      list.push(meta['desc']);
    }
    return list;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// weekday meta

  function weekday_meta (idx) {
    var name; if (name = calendar['weekdays'][idx]) {
      return { 'name': name, 'desc': name };
    } else {
      var desc = sprintf('Weekday %d',(idx + 1));
      return { 'name': '', 'desc': desc };
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/moons.js
//
// copyright (c) 2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// configuration

  var phase_desc = [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ];
  var phase_text = [
    ' - ', '  )', ' [)', '+[)', '(+)', '(]+', '(] ', '(  '
  ];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// number of moons reaction

  function n_moons_reaction () {
    var n_moons = check_int('n_moons',0,13);

    update_calendar();
    scan_moons();
    rebuild_lunar_table();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// scan moons

  function scan_moons () {
    calendar['moons'] = [];
    calendar['lunar_cyc'] = {};
    calendar['lunar_shf'] = {};

    var idx; for (idx = 0; idx < calendar['n_moons']; idx++) {
      var cyc = moon_cyc(idx);
      var shf = moon_shf(idx,cyc);
      var name = moon_name(idx);

      if (name) {
        calendar['moons'][idx] = name;
        calendar['lunar_cyc'][name] = cyc;
        calendar['lunar_shf'][name] = shf;
      } else {
        calendar['lunar_cyc'][idx] = cyc;
        calendar['lunar_shf'][idx] = shf;
      }
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// query functions

  function moon_name (idx) {
    var id = sprintf('lun-%d',idx);

    var field; if (field = $(id)) {
      return field.getValue();
    } else {
      return undefined;
    }
  }
  function moon_cyc (idx) {
    var id = sprintf('lun-%d-cyc',idx);

    var field; if (field = $(id)) {
      return check_float(id,1);
    } else {
      return undefined;
    }
  }
  function moon_shf (idx, cyc) {
    var id = sprintf('lun-%d-shf',idx);

    var field; if (field = $(id)) {
      var shf = field.intValue();
      var cyc_int = Math.floor(cyc);

      if (shf < 0) {
        while (shf < 0) shf += cyc_int;
      }
      if (shf > 0) {
        shf = (shf % cyc_int);
      }
      $(id).setValue(shf);
      return shf;
    } else {
      return undefined;
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// rebuild lunar table

  function rebuild_lunar_table () {
    $('lunar_table').update('');

    var idx; for (idx = 0; idx < calendar['n_moons']; idx++) {
      var meta = moon_meta(idx);
      $('lunar_table').insert(new_lunar_row(idx,meta));

      $(sprintf('lun-%d',idx)).observe('change',moon_name_reaction);
      $(sprintf('lun-%d-cyc',idx)).observe('change',lunar_cyc_reaction);
      $(sprintf('lun-%d-shf',idx)).observe('change',lunar_shf_reaction);
    }
    scan_moons();
    rebuild_moon_list();
  }
  function new_lunar_row (idx, meta) {
    var list = [
      { 'id': sprintf('lun-%d',idx), 'value': meta['name'],
        'size': 20, 'placeholder': 'Name' },
      { 'id': sprintf('lun-%d-cyc',idx), 'value': meta['cyc'],
        'size': 5, 'className': 'right', 'note': 'cycle' },
      { 'id': sprintf('lun-%d-shf',idx), 'value': meta['shf'],
        'size': 5, 'className': 'right', 'note': 'shift' }
    ];
    return input_row({},list);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// moon reactions

  function moon_name_reaction () {
    scan_moons();
    rebuild_moon_list();
    rebuild_calendar();
  }
  function lunar_cyc_reaction () {
    scan_moons();
    rebuild_calendar();
  }
  function lunar_shf_reaction () {
    scan_moons();
    rebuild_calendar();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// rebuild moon list

  function rebuild_moon_list () {
    var list = moon_list();
    $('moon_list').update(list.join(', '));
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// moon list

  function moon_list () {
    var list = [];

    var idx; for (idx = 0; idx < calendar['n_moons']; idx++) {
      var meta = moon_meta(idx);
      list.push(meta['desc']);
    }
    return list;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// moon meta

  function moon_meta (idx) {
    var name; if (name = calendar['moons'][idx]) {
      var meta = { 'name': name, 'desc': name };

      if (calendar['lunar_cyc'][name]) {
        meta['cyc'] = calendar['lunar_cyc'][name];
      } else {
        meta['cyc'] = default_moon_cyc(idx);
      }
      if (calendar['lunar_shf'][name]) {
        meta['shf'] = calendar['lunar_shf'][name];
      } else {
        meta['shf'] = 0;
      }
      return meta;
    } else {
      var desc = sprintf('Moon %d',(idx + 1));
      var meta = { 'name': '', 'desc': desc };

      if (calendar['lunar_cyc'][idx]) {
        meta['cyc'] = calendar['lunar_cyc'][idx];
      } else {
        meta['cyc'] = default_moon_cyc(idx);
      }
      if (calendar['lunar_shf'][idx]) {
        meta['shf'] = calendar['lunar_shf'][idx];
      } else {
        meta['shf'] = 0;
      }
      return meta;
    }
  }
  function default_moon_cyc (idx) {
    var base = ((idx + 1) * 10);
    return Math.floor(Math.random() * base) + base;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// lunar phase

  function lunar_phase (epoch, idx) {
    var meta = moon_meta(idx);
    var x = ((epoch - meta['shf']) / meta['cyc']);
    var f = (x - Math.floor(x));
    var phase = Math.floor(f * 8);

    return phase;
  }
  function lunar_icon (name, phase) {
    var title = [ name, phase_desc[phase] ].join(', ');

    var attr = {
      'title':          title,
      'className':      sprintf('lunar phase-%d',phase)
    };
    return Builder.node('div',attr,[ title ]);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/layout.js
//
// copyright (c) 2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// configuration

  var layout = {};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// init layout

  function init_layout () {
    var yd = calendar['first_day'];
    var epoch = ((calendar['year'] * calendar['year_len']) + yd);

    layout['yd']        = yd;
    layout['epoch']     = epoch;
    layout['months']    = month_list();
    layout['weekdays']  = weekday_list();
    layout['moons']     = moon_list();
    layout['events']    = event_list();
  }
  function event_list () {
    var events = {};

    if (calendar['events']) {
      init_seed(layout['epoch']);

      var m; for (m = 0; m < calendar['n_months']; m++) {
        var meta = month_meta(m);

        var d; for (d = 1; d <= meta['len']; d++) {
          var ymd = sprintf('%d-%d-%d',calendar['year'],(m + 1),d);

          var event; if (event = celestial_event()) {
            events[ymd] = event;
          }
        }
      }
    }
    return events;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// celestial events

  function celestial_event () {
    var idx = random(100);

           if (idx <  2) { return 'Aurora';
    } else if (idx < 12) { return 'Shooting star';
    } else if (idx < 14) { return 'Fireball';
    } else if (idx < 16) { return 'Meteor shower';
    } else if (idx < 18) { return random_eclipse();
    } else if (idx < 19) { return 'Solar eclipse';
    } else if (idx < 24) { return 'Morning star';
    } else if (idx < 29) { return 'Evening star';
    } else if (idx < 30) { return 'Wanderers gather';
    } else if (idx < 31) { return 'Comet appears';
    } else               { return ''; }
  }
  function random_eclipse () {
    if (layout['moons'].length) {
      return sprintf('Eclipse of %s',random_moon());
    } else {
      return '';
    }
  }
  function random_moon () {
    var idx = random(layout['moons'].length);
    return layout['moons'][idx];
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// block layout

  function block_layout (tbody) {
    var week_len = calendar['week_len'];
    var yd = layout['yd'];
    var epoch = layout['epoch'];

    var m; for (m = 0; m < calendar['n_months']; m++) {
      var mbody = Builder.node('tbody');
      var meta = month_meta(m);
      var week_row = [];

      mbody.insert(month_row(week_len,meta['desc']));
      mbody.insert(weekday_header(layout['weekdays']));

      var fix = ((yd + week_len) % week_len);
      if (fix > 0) week_row.push(pad_cell(fix));

      var d; for (d = 1; d <= meta['len']; d++, yd++, epoch++) {
        var wd = (yd + week_len) % week_len;
        var ymd = sprintf('%d-%d-%d',calendar['year'],(m + 1),d);

        if (wd == 0 && d > 1) {
          mbody.insert(Builder.node('tr',week_row));
          week_row = [];
        }
        week_row.push(block_mday(d,yd,epoch,ymd));
      }
      if (week_row.length > 0) {
        var fix = (week_len - week_row.length);
        if (fix > 0) week_row.push(pad_cell(fix));

        mbody.insert(Builder.node('tr',week_row));
      }
      tbody.insert(mbody_row(mbody));
    }
    tbody.insert(Builder.node('table'));
    tbody.addClassName('block');
    return tbody;
  }
  function block_mday (d, yd, epoch, ymd) {
    var list = [ mday_div(d) ];

    if (calendar['n_moons'] > 0) {
      var mlist = [];

      var i; for (i = 0; i < calendar['n_moons']; i++) {
        var phase = lunar_phase(epoch,i);
        mlist.push(lunar_icon(layout['moons'][i],phase));
      }
      list.push(moons_div(mlist));
    }
    if (calendar['notes'][ymd] != undefined) {
      list.push(note_div(ymd,calendar['notes'][ymd]));
    } else if (layout['events'][ymd] != undefined) {
      list.push(note_div(ymd,layout['events'][ymd]));
    } else {
      list.push(note_div(ymd,''));
    }
    return wday_cell(list);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// html toolkit

  function mbody_row (mbody) {
    var table = Builder.node('table',[ mbody ]);
    return Builder.node('tr',[ Builder.node('td',[ table ]) ]);
  }
  function month_row (span, name) {
    var header = Builder.node('h2',[ name ]);
    var attr = { 'colspan': span, 'className': 'center' };

    return Builder.node('tr',[ Builder.node('td',attr,[ header ]) ]);
  }
  function weekday_header (list) {
    return Builder.node('tr',list.map(header_cell).flatten());
  }
  function header_cell (node) {
    return Builder.node('th',[ node ]);
  }
  function pad_cell (span) {
    var attr = { 'colspan': span };
    return Builder.node('td',attr,'');
  }
  function wday_cell (list) {
    var attr = { 'className': 'wday' };
    return Builder.node('td',attr,list);
  }
  function mday_div (m) {
    var attr = { 'className': 'mday' };
    return Builder.node('div',attr,[ m ]);
  }
  function moons_div (list) {
    var attr = { 'className': 'moons' };
    return Builder.node('div',attr,list);
  }
  function note_div (ymd, note) {
    var attr = { 'id': 'note-' + ymd, 'className': 'note', 'data-ymd': ymd };
    return Builder.node('div',attr,[ note ]);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// vertical layout

  function vertical_layout (tbody) {
    var week_len = calendar['week_len'];
    var yd = layout['yd'];
    var epoch = layout['epoch'];
    var span = calendar['n_moons'] + 3;

    var m; for (m = 0; m < calendar['n_months']; m++) {
      var meta = month_meta(m);
      tbody.insert(month_row(span,meta['desc']));

      var d; for (d = 1; d <= meta['len']; d++, yd++, epoch++) {
        var wd = (yd + week_len) % week_len;
        var ymd = sprintf('%d-%d-%d',calendar['year'],(m + 1),d);

        if (wd == 0 && d > 1) {
          tbody.insert(break_row(span));
        }
        var name = layout['weekdays'][wd];
        var list;

        if (wd == 0) {
          list = [ bold(d), bold(name) ];
        } else {
          list = [ d, name ];
        }
        var i; for (i = 0; i < calendar['n_moons']; i++) {
          var phase = lunar_phase(epoch,i);
          list.push(lunar_icon(layout['moons'][i],phase));
        }
        if (calendar['notes'][ymd] != undefined) {
          list.push(note_div(ymd,calendar['notes'][ymd]));
        } else if (layout['events'][ymd] != undefined) {
          list.push(note_div(ymd,layout['events'][ymd]));
        } else {
          list.push(note_div(ymd,''));
        }
        tbody.insert(calendar_row(list));
      }
    }
    tbody.addClassName('vertical');
    return tbody;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// html toolkit

  function calendar_row (list) {
    return Builder.node('tr',list.map(calendar_cell).flatten());
  }
  function calendar_cell (node) {
    return Builder.node('td',[ node ]);
  }
  function bold (node) {
    return Builder.node('b',[ node ]);
  }
  function break_row (span) {
    var attr = { 'colspan': span };
    return Builder.node('tr',[ Builder.node('td',attr,'') ]);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// text layout

  function text_layout (tbody) {
    var week_len = calendar['week_len'];
    var yd = layout['yd'];
    var epoch = layout['epoch'];

    var text = sprintf("Year: %d\n",calendar['year']);
        text += sprintf("Moons: %s\n\n",layout['moons'].join(', '));
    var fmt = mday_fmt();

    var m; for (m = 0; m < calendar['n_months']; m++) {
      var meta = month_meta(m);
      text += meta['desc'] + "\n\n";

      var d; for (d = 1; d <= meta['len']; d++, yd++, epoch++) {
        var wd = (yd + week_len) % week_len;
        var ymd = sprintf('%d-%d-%d',calendar['year'],(m + 1),d);

        if (wd == 0 && d > 1) {
          text += "\n";
        }
        var name = layout['weekdays'][wd];
        var list = [ d, name ];

        var i; for (i = 0; i < calendar['n_moons']; i++) {
          var phase = lunar_phase(epoch,i);
          list.push(phase_text[phase]);
        }
        if (calendar['notes'][ymd] != undefined) {
          list.push(calendar['notes'][ymd]);
        } else if (layout['events'][ymd] != undefined) {
          list.push(layout['events'][ymd]);
        } else {
          list.push('');
        }
        text += vsprintf(fmt,list);
      }
      text += "\n";
    }
    tbody.insert(text_row(text));
    tbody.addClassName('text');
    return tbody;
  }
  function mday_fmt () {
    var moon_fmt = '  %3.3s'.times(calendar['n_moons']);
    return '  %4d  %-10.10s' + moon_fmt + "  %s\n";
  }
  function text_row (text) {
    var attr = { 'cols': 80, 'rows': 20, 'className': 'monospace' };
    var textarea = Builder.node('textarea',attr,text);

    return Builder.node('tr',[ Builder.node('td',[ textarea ]) ]);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// calendar/toolkit.js
//
// copyright (c) 2017 drow <drow@bin.sh>
// all rights reserved.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// configuration

  var seed = 1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// pseudo-random number generator

  function init_seed (value) {
    seed = value;
  }
  function random (n) {
    seed = (1103515245 * seed) + 12345;   // glibc lcg
    seed = (seed & 0x7fffffff);

    if (n > 1) {
      return ((seed >> 8) % n);
    } else {
      return 0;
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// random number

  function random_number (min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// new option

  function new_option (value, label) {
    var attr = { 'value': value };
    return Builder.node('option',attr,label);
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct input row

  function input_row (attr, list) {
    return Builder.node('tr',attr,list.map(input_cell).flatten());
  }
  function input_cell (attr) {
    var input = Builder.node('input',attr);

    if (note = attr['note']) {
      return Builder.node('td',[ input, ' ' + note ]);
    } else {
      return Builder.node('td',[ input ]);
    }
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// check value within bounds

  function check_int (id, min, max) {
    var value = $(id).intValue();
    return check_number(id,value,min,max);
  }
  function check_float (id, min, max) {
    var value = $(id).floatValue();
    return check_number(id,value,min,max);
  }
  function check_number (id, value, min, max) {
    if (value < min) value = min;
    if (max && value > max) value = max;

    $(id).setValue(value);
    return value;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var genericSearch = function(query, section) {
  var sections = {
    EMOTICONS: 'tag_item_class_4',
    BACKGROUNDS: 'tag_item_class_3',
    CARDS: 'tag_item_class_2',
    BOOSTERS: 'tag_item_class_5'
  };
  var link = "http://steamcommunity.com/market/search?q=" + (encodeURIComponent(query)) + "&category_753_Game%5B%5D=any" + (sections[section] ? '&category_753_item_class%5B%5D=' + sections[section] : '') + "&appid=753";
  chrome.tabs.create({
    url: link,
    active: false
  });
};

var ctx = ['selection'];

var menus = [{
  label: "Search emoticons",
  click: function(info, tab) {
    genericSearch(info.selectionText, 'EMOTICONS');
  }
}, {
  label: 'Search trading cards',
  click: function(info, tab) {
    genericSearch(info.selectionText, 'CARDS');
  }
}, {
  label: 'Search profile backgrounds',
  click: function(info, tab) {
    genericSearch(info.selectionText, 'BACKGROUNDS');
  }
}, {
  label: 'Search booster packs',
  click: function(info, tab) {
    genericSearch(info.selectionText, 'BOOSTERS');
  }
}, {
  label: 'Search everything',
  click: function(info, tab) {
    genericSearch(info.selectionText);
  }
}];

for (var i = 0; i < menus.length; i++) {
  var menu = menus[i];
  chrome.contextMenus.create({
    title: menu.label,
    onclick: menu.click,
    contexts: ctx
  });
}
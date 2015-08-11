var genericSearch = function(info) {
  var query = info.selectionText;
  var section = menuIds[info.menuItemId];
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
  textId: 'EMOTICONS',
  label: "Search emoticons"
}, {
  textId: 'CARDS',
  label: 'Search trading cards'
}, {
  textId: 'BACKGROUNDS',
  label: 'Search profile backgrounds'
}, {
  textId: 'BOOSTERS',
  label: 'Search booster packs'
}, {
  textId: null,
  label: 'Search everything'
}];
var menuIds = {};

for (var i = 0; i < menus.length; i++) {
  var menu = menus[i];
  var menuId = chrome.contextMenus.create({
    title: menu.label,
    onclick: genericSearch,
    contexts: ctx
  });
  menuIds[menuId] = menu.textId;
}
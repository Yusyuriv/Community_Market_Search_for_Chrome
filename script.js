var genericSearch = function(info) {
  var query = info.selectionText;
  var section = menuIds[info.menuItemId];
  var appid;
  if(info.linkUrl && section.endsWith('-link')) {
    appid = info.linkUrl.match(/^https?:\/\/(?:store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i);
    if(appid)
      appid = appid[1];
    section = section.split('-')[0];
  }
  var sections = {
    EMOTICONS: 'tag_item_class_4',
    BACKGROUNDS: 'tag_item_class_3',
    CARDS: 'tag_item_class_2',
    BOOSTERS: 'tag_item_class_5'
  };
  var link = "http://steamcommunity.com/market/search?q=" +
    (query ? encodeURIComponent(query) : '') +
    "&category_753_Game%5B%5D=" +
    (appid ? 'tag_app_' + appid : 'any') +
    (sections[section] ? '&category_753_item_class%5B%5D=' + sections[section] : '') +
    "&appid=753";
  chrome.tabs.create({
    url: link,
    active: false
  });
};

var ctx = ['selection'];
var linkCtx = ['link'];

var parentSelection = chrome.contextMenus.create({
  title: 'Search for selection on Community Market',
  contexts: ctx
});
var parentLink = chrome.contextMenus.create({
  title: 'Search for this link\'s appid on Community Market',
  contexts: linkCtx,
  targetUrlPatterns: [
    '*://store.steampowered.com/app/*',
    '*://steamcommunity.com/app/*',
    '*://www.steamcommunity.com/app/*'
  ]
});

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
    parentId: parentSelection,
    contexts: ctx
  });
  menuIds[menuId] = menu.textId;

  menuId = chrome.contextMenus.create({
    title: menu.label,
    onclick: genericSearch,
    parentId: parentLink,
    contexts: linkCtx
  });
  menuIds[menuId] = menu.textId + '-link';
}
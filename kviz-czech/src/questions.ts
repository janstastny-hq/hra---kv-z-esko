export interface Question {
  id: string;
  points: 1 | 2 | 5 | 10;
  question: string;
  options: string[];
  answer: string;
  category: 'Geografie & Příroda' | 'Historie & Osobnosti' | 'Památky & Města' | 'Zajímavosti & Rekordy';
}

export interface RegionInfo {
  id: string;
  name: string;
  shortName: string;
  capital: string;
  description: string;
}

export const REGIONS: Record<string, RegionInfo> = {
  PHA: { id: 'PHA', name: 'Hlavní město Praha', shortName: 'Praha', capital: 'Praha', description: 'Metropole České republiky plná památek zapsaných na seznamu UNESCO.' },
  STC: { id: 'STC', name: 'Středočeský kraj', shortName: 'Středočeský', capital: 'Praha', description: 'Největší kraj obklopující Prahu, známý množstvím hradů a zámků.' },
  JHC: { id: 'JHC', name: 'Jihočeský kraj', shortName: 'Jihočeský', capital: 'České Budějovice', description: 'Kraj rybníků, hlubokých lesů, Šumavy and malebné jihočeské architektury.' },
  PLZ: { id: 'PLZ', name: 'Plzeňský kraj', shortName: 'Plzeňský', capital: 'Plzeň', description: 'Centrum českého pivovarnictví, kraj se Šumavou a Českým lesem.' },
  KVK: { id: 'KVK', name: 'Karlovarský kraj', shortName: 'Karlovarský', capital: 'Karlovy Vary', description: 'Světoznámý lázeňský trojúhelník, minerální prameny a sklářství.' },
  ULK: { id: 'ULK', name: 'Ústecký kraj', shortName: 'Ústecký', capital: 'Ústí nad Labem', description: 'Kraj s Českým Švýcarskem, Krušnými horami a bohatou průmyslovou historií.' },
  LBK: { id: 'LBK', name: 'Liberecký kraj', shortName: 'Liberecký', capital: 'Liberec', description: 'Nejmenší kraj známý Jizerskými horami, Ještědem a sklářskou tradicí.' },
  HKK: { id: 'HKK', name: 'Královéhradecký kraj', shortName: 'Královéhradecký', capital: 'Hradec Králové', description: 'Kraj s nejvyšší českou horou Sněžkou, Krkonošemi a pískovcovými skálami.' },
  PAK: { id: 'PAK', name: 'Pardubický kraj', shortName: 'Pardubický', capital: 'Pardubice', description: 'Domov velké pardubické, perníku, koní v Kladrubech a Železných hor.' },
  VYS: { id: 'VYS', name: 'Kraj Vysočina', shortName: 'Vysočina', capital: 'Jihlava', description: 'Kraj nedotčené přírody na pomezí Čech a Moravy se třemi památkami UNESCO.' },
  JHM: { id: 'JHM', name: 'Jihomoravský kraj', shortName: 'Jihomoravský', capital: 'Brno', description: 'Kraj slunce, vína, folklóru, Moravského krasu a pulzujícího Brna.' },
  OLK: { id: 'OLK', name: 'Olomoucký kraj', shortName: 'Olomoucký', capital: 'Olomouc', description: 'Úrodná Haná, pohoří Jeseníky s Pradědem a unikátní barokní památky.' },
  ZLK: { id: 'ZLK', name: 'Zlínský kraj', shortName: 'Zlínský', capital: 'Zlín', description: 'Baťův funkcionalismus, folklórní Slovácko a Valašsko s Beskydami.' },
  MSK: { id: 'MSK', name: 'Moravskoslezský kraj', shortName: 'Moravskoslezský', capital: 'Ostrava', description: 'Industriální dědictví Ostravy, Beskydy a Jeseníky s bohatou historií.' }
};

interface RegionFactDetails {
  highestPointName: string;
  highestPointHeight: number;
  famousCastle: string;
  mainRiver: string;
  famousProduct: string;
  famousProductOptions: string[];
  geographicalRecord: string;
  geographicalRecordAnswer: string;
  geographicalRecordOptions: string[];
  obscureHistory: string;
  obscureHistoryAnswer: string;
  obscureHistoryOptions: string[];
  technicalMonument: string;
  technicalMonumentAnswer: string;
  technicalMonumentOptions: string[];
  dialectOrCulture: string;
  dialectOrCultureAnswer: string;
  dialectOrCultureOptions: string[];
}

const REGION_FACTS: Record<string, RegionFactDetails> = {
  PHA: {
    highestPointName: 'vrch Teleček u Sobína',
    highestPointHeight: 399,
    famousCastle: 'Pražský hrad',
    mainRiver: 'Vltava',
    famousProduct: 'Světoznámý pražský orloj z roku 1410',
    famousProductOptions: ['Pražský orloj', 'Štefánikova hvězdárna', 'Tančící dům', 'Průmyslový palác'],
    geographicalRecord: 'Která stanice pražského metra je nejhlubší pod povrchem (cca 53 metrů)?',
    geographicalRecordAnswer: 'Náměstí Míru',
    geographicalRecordOptions: ['Náměstí Míru', 'Můstek', 'Muzeum', 'Hradčanská'],
    obscureHistory: 'Jaké zvíře má ve svém oficiálním erbu městská část Praha-Troja?',
    obscureHistoryAnswer: 'Trojského koně',
    obscureHistoryOptions: ['Trojského koně', 'Zlatého lva', 'Černou orlici', 'Bílou labuť'],
    technicalMonument: 'Jaký unikátní potrubní systém z 19. století byl zničen ničivou povodní v roce 2002?',
    technicalMonumentAnswer: 'Pneumatická potrubní pošta',
    technicalMonumentOptions: ['Pneumatická potrubní pošta', 'Parní vytápění čtvrtí', 'Smetanův gravitační vodovod', 'Podzemní lanová dráha'],
    dialectOrCulture: 'Které dva světské řády zpodobňuje sousoší na Karlově mostě, kde osvobozují křesťanské zajatce?',
    dialectOrCultureAnswer: 'Trinitáři a redemptoristé',
    dialectOrCultureOptions: ['Trinitáři a redemptoristé', 'Templáři a johanité', 'Jezuité a františkáni', 'Dominikáni a benediktini']
  },
  STC: {
    highestPointName: 'Tok v Brdech',
    highestPointHeight: 865,
    famousCastle: 'Karlštejn',
    mainRiver: 'Berounka',
    famousProduct: 'Legendární automobilka Škoda v Mladé Boleslavi',
    famousProductOptions: ['Škoda Auto', 'Tatra Kopřivnice', 'Jawa Týnec', 'Aero Vodochody'],
    geographicalRecord: 'U kterého středočeského města dochází k soutoku našich dvou nejznámějších řek Labe a Vltavy?',
    geographicalRecordAnswer: 'Mělník',
    geographicalRecordOptions: ['Mělník', 'Poděbrady', 'Nymburk', 'Kralupy nad Vltavou'],
    obscureHistory: 'Které slavné keltské oppidum a rozsáhlá svatyně leží na vrchu nad řekou Berounkou u Nižboru?',
    obscureHistoryAnswer: 'Stradonice',
    obscureHistoryOptions: ['Stradonice', 'Závist u Zbraslavi', 'Třísov', 'Hrazany'],
    technicalMonument: 'Které město bylo od středověku hlavním zdrojem stříbra pro české království a razilo Groše?',
    technicalMonumentAnswer: 'Kutná Hora',
    technicalMonumentOptions: ['Kutná Hora', 'Příbram', 'Jílové u Prahy', 'Březové Hory'],
    dialectOrCulture: 'Který světoznámý spisovatel popsal drsnou i humornou poetiku v pivovarských Postřižinách v Nymburce?',
    dialectOrCultureAnswer: 'Bohumil Hrabal',
    dialectOrCultureOptions: ['Bohumil Hrabal', 'Jaroslav Hašek', 'Karel Čapek', 'Jan Neruda']
  },
  JHC: {
    highestPointName: 'Plechý na Šumavě',
    highestPointHeight: 1378,
    famousCastle: 'Hluboká nad Vltavou',
    mainRiver: 'Lužnice',
    famousProduct: 'Budějovický Budvar a tradiční tužky Koh-i-noor Hardtmuth',
    famousProductOptions: ['Koh-i-noor Hardtmuth', 'Preciosa sklárny', 'Tonak klobouky', 'Zbrojovka'],
    geographicalRecord: 'Jak se jmenuje naprosto největší rybník v celé České republice podle rozlohy vodní plochy?',
    geographicalRecordAnswer: 'Rožmberk',
    geographicalRecordOptions: ['Rožmberk', 'Bezdrev', 'Svět', 'Horusický rybník'],
    obscureHistory: 'Jaký slavný rod držící pětilistou růži v erbu ovládal po staletí jižní Čechy a soupeřil s králi?',
    obscureHistoryAnswer: 'Rožmberkové',
    obscureHistoryOptions: ['Rožmberkové', 'Pernštejnové', 'Schwarzenbergové', 'Lichtenštejnové'],
    technicalMonument: 'U kterého jihočeského města se nachází unikátní technická památka – visutý Stádlecký řetězový most?',
    technicalMonumentAnswer: 'Bechyně',
    technicalMonumentOptions: ['Bechyně', 'Písek', 'Týn nad Vltavou', 'Suchdol nad Lužnicí'],
    dialectOrCulture: 'Která vesnice na jihu Čech je zapsaná v UNESCO jako nejkrásnější příklad selského baroka?',
    dialectOrCultureAnswer: 'Holašovice',
    dialectOrCultureOptions: ['Holašovice', 'Kvilda', 'Hluboká', 'Netolice']
  },
  PLZ: {
    highestPointName: 'Velká Mokrůvka',
    highestPointHeight: 1370,
    famousCastle: 'Rabí',
    mainRiver: 'Mže',
    famousProduct: 'Světoznámý zlatavý ležák Pilsner Urquell',
    famousProductOptions: ['Pilsner Urquell', 'Staropramen', 'Gambrinus', 'Budweiser'],
    geographicalRecord: 'Která dominanta Plzně se pyšní nejvyšší kostelní věží v celé České republice (102,6 m)?',
    geographicalRecordAnswer: 'Katedrála svatého Bartoloměje',
    geographicalRecordOptions: ['Katedrála svatého Bartoloměje', 'Kostel sv. Jiljí', 'Velká synagoga', 'Chrám sv. Mikuláše'],
    obscureHistory: 'Jak se nazývá historické etnikum svobodných strážců západočeských hranic s tradicí na Chodsku?',
    obscureHistoryAnswer: 'Chodové',
    obscureHistoryOptions: ['Chodové', 'Valaši', 'Slováci', 'Hanáci'],
    technicalMonument: 'Která nejstarší uceleně dochovaná rotunda v ČR z 10. století stojí kousek od Plzně?',
    technicalMonumentAnswer: 'Rotunda svatého Petra a Pavla ve Starém Plzenci',
    technicalMonumentOptions: ['Rotunda svatého Petra a Pavla ve Starém Plzenci', 'Rotunda sv. Kateřiny', 'Rotunda sv. Jiří', 'Rotunda sv. Martina'],
    dialectOrCulture: 'Který legendární český loutkář založil v Plzni divadlo a stvořil věčné postavy Spejbla a Hurvínka?',
    dialectOrCultureAnswer: 'Josef Skupa',
    dialectOrCultureOptions: ['Josef Skupa', 'Jiří Trnka', 'Hermína Týrlová', 'Matěj Kopecký']
  },
  KVK: {
    highestPointName: 'Klínovec v Krušných horách',
    highestPointHeight: 1244,
    famousCastle: 'hrad Loket',
    mainRiver: 'Ohře',
    famousProduct: 'Karlovarský bylinný likér Becherovka',
    famousProductOptions: ['Becherovka', 'Fernet Stock', 'Stará myslivecká', 'Griotte'],
    geographicalRecord: 'Který termální karlovarský pramen tryská teplotou 73 °C do výšky až 12 metrů?',
    geographicalRecordAnswer: 'Vřídlo',
    geographicalRecordOptions: ['Vřídlo', 'Mlýnský pramen', 'Hadí pramen', 'Pramen Svoboda'],
    obscureHistory: 'Ve kterém karlovarském hradu či zámku je trvale uložen nesmírně vzácný zlatý Relikviář svatého Maura?',
    obscureHistoryAnswer: 'Bečov nad Teplou',
    obscureHistoryOptions: ['Bečov nad Teplou', 'Kynžvart', 'Loket', 'Ostrov'],
    technicalMonument: 'Jak se nazývá slavná přírodní rezervace s jedinečnými mofetami (bahenními sopkami)?',
    technicalMonumentAnswer: 'SOOS',
    technicalMonumentOptions: ['SOOS', 'Kladské rašeliniště', 'Božídarské rašeliniště', 'Svatošské skály'],
    dialectOrCulture: 'Který světoznámý král nechal založit Karlovy Vary poté, co při lovu jelena objevil horké prameny?',
    dialectOrCultureAnswer: 'Karel IV.',
    dialectOrCultureOptions: ['Karel IV.', 'Václav II.', 'Rudolf II.', 'Jiří z Poděbrad']
  },
  ULK: {
    highestPointName: 'Milešovka (největrnější hora ČR)',
    highestPointHeight: 837,
    famousCastle: 'Hazmburk',
    mainRiver: 'Labe',
    famousProduct: 'Výroba žateckého chmele "poloraného červeňáku"',
    famousProductOptions: ['Žatecký chmel', 'Ústecké mýdlo', 'Děčínské kotvy', 'Rudohorské hračky'],
    geographicalRecord: 'Jak se jmenuje největší pískovcový skalní most v Evropě, ležící v Českém Švýcarsku?',
    geographicalRecordAnswer: 'Pravčická brána',
    geographicalRecordOptions: ['Pravčická brána', 'Tiské stěny', 'Edmundova soutěska', 'Děčínský Sněžník'],
    obscureHistory: 'Která památná hora vystupuje z rovinatého Polabí a podle bájí na ni vystoupil Praotec Čech?',
    obscureHistoryAnswer: 'Říp',
    obscureHistoryOptions: ['Říp', 'Milešovka', 'Lovoš', 'Hazmburk'],
    technicalMonument: 'Které smutně proslulé městone-pevnost bylo během 2. světové války zneužito jako židovské ghetto?',
    technicalMonumentAnswer: 'Terezín',
    technicalMonumentOptions: ['Terezín', 'Litoměřice', 'Most', 'Duchcov'],
    dialectOrCulture: 'Jak byla klimatology pojmenována hora Milešovka kvůli extrémně častým bouřím a větrům?',
    dialectOrCultureAnswer: 'Hromová hora',
    dialectOrCultureOptions: ['Hromová hora', 'Větrný dóm', 'Mlžný hrad', 'Královna severu']
  },
  LBK: {
    highestPointName: 'Kotel v Krkonoších',
    highestPointHeight: 1435,
    famousCastle: 'Bezděz',
    mainRiver: 'Jizera',
    famousProduct: 'Tradiční sklářství a luxusní designové lustry Lasvit / Preciosa',
    famousProductOptions: ['Sklo and lustry', 'Tkaní lnu', 'Těžba uranu', 'Výroba papíru'],
    geographicalRecord: 'Která unikátní stavba architekta Karla Hubáčka ve tvaru rotačního hyperboloidu korunuje Ještěd?',
    geographicalRecordAnswer: 'Televizní vysílač Ještěd',
    geographicalRecordOptions: ['Televizní vysílač Ještěd', 'Rozhledna Štěpánka', 'Liberecká radnice', 'IQLandia'],
    obscureHistory: 'Který slavný vojevůdce třicetileté války měl své vévodství sídlící v Jičíně a na Frýdlantu?',
    obscureHistoryAnswer: 'Albrecht z Valdštejna',
    obscureHistoryOptions: ['Albrecht z Valdštejna', 'Jan Žižka', 'Kryštof Harant', 'Jan Rudolf Trčka'],
    technicalMonument: 'Jak se jmenuje slavná čedičová skála u Kamenického Šenova přezdívaná "Kamenné varhany"?',
    technicalMonumentAnswer: 'Panská skála',
    technicalMonumentOptions: ['Panská skála', 'Suché skály', 'Besedické skály', 'Sloní kameny'],
    dialectOrCulture: 'Která slavná dálková lyžařská trať na 50 km se každoročně startuje z Jizerských hor v Bedřichově?',
    dialectOrCultureAnswer: 'Jizerská padesátka',
    dialectOrCultureOptions: ['Jizerská padesátka', 'Krkonošská sedmdesátka', 'Šumavský maraton', 'Beskydská sedmička']
  },
  HKK: {
    highestPointName: 'Sněžka (nejvyšší hora celého Česka)',
    highestPointHeight: 1603,
    famousCastle: 'hrad Kost',
    mainRiver: 'Labe',
    famousProduct: 'Kladrubské klavíry Petrof a pískovcové lomy',
    famousProductOptions: ['Piana Petrof', 'Sklářství', 'Krajkářství Vamberk', 'Hradecké zvony'],
    geographicalRecord: 'Kde přesně vyvěrá a začíná svou pouť do Severního moře řeka Labe ve výšce 1386 m n. m.?',
    geographicalRecordAnswer: 'Labská louka',
    geographicalRecordOptions: ['Labská louka', 'Sněžné jámy', 'Úpské rašeliniště', 'Modrý důl'],
    obscureHistory: 'U kterého hradeckého města došlo v roce 1866 k největší rakousko-pruské bitvě na našem území?',
    obscureHistoryAnswer: 'Sadová (u Hradce Králové)',
    obscureHistoryOptions: ['Sadová (u Hradce Králové)', 'Náchod', 'Trutnov', 'Jičín'],
    technicalMonument: 'Který barokní komplex s Braunovými sochami Ctností a Neřestí nechal postavit hrabě Špork?',
    technicalMonumentAnswer: 'Hospital Kuks',
    technicalMonumentOptions: ['Hospital Kuks', 'Klášter Broumov', 'Zámek Opočno', 'Zámek Ratibořice'],
    dialectOrCulture: 'Jaké jméno nese slavná rázovitá babička a její údolí z děl spisovatelky Boženy Němcové?',
    dialectOrCultureAnswer: 'Babička v Ratibořickém údolí',
    dialectOrCultureOptions: ['Babička v Ratibořickém údolí', 'Viktorka u splavu', 'Divá Bára', 'Karla z pohraničí']
  },
  PAK: {
    highestPointName: 'Králici na Králickém Sněžníku',
    highestPointHeight: 1424,
    famousCastle: 'Kunětická hora',
    mainRiver: 'Chrudimka',
    famousProduct: 'Pardubický perník z voňavého těsta s medem',
    famousProductOptions: ['Pardubický perník', 'Hořické trubičky', 'Štramberské uši', 'Lázeňské oplatky'],
    geographicalRecord: 'Který nejstarší, nejtěžší a nejprestižnější dostih kontinentální Evropy se v Pardubicích běhá od r. 1874?',
    geographicalRecordAnswer: 'Velká pardubická',
    geographicalRecordOptions: ['Velká pardubická', 'Zlatá přilba', 'Memoriál Alfréda Nobela', 'Pardubická juniorka'],
    obscureHistory: 'Který slavný šlechtický rod vybudoval v Pardubicích vodní opevnění a měl zubří hlavu ve znaku?',
    obscureHistoryAnswer: 'Pernštejnové',
    obscureHistoryOptions: ['Pernštejnové', 'Rožmberkové', 'Slavatové', 'Kounicové'],
    technicalMonument: 'Který národní hřebčín, památka UNESCO, chová starokladrubské koně už od časů císaře Rudolfa II.?',
    technicalMonumentAnswer: 'Kladruby nad Labem',
    technicalMonumentOptions: ['Kladruby nad Labem', 'Slatiňany', 'Equus Heřmanův Městec', 'Hřebčín Albertovec'],
    dialectOrCulture: 'Ve kterém renesančním zámku zapsaném v UNESCO se narodil slavný hudební skladatel Bedřich Smetana?',
    dialectOrCultureAnswer: 'Litomyšl',
    dialectOrCultureOptions: ['Litomyšl', 'Chrudim', 'Moravská Třebová', 'Lanškroun']
  },
  VYS: {
    highestPointName: 'Javořice',
    highestPointHeight: 837,
    famousCastle: 'hrad Pernštejn',
    mainRiver: 'Sázava',
    famousProduct: 'Ruční sklářská výroba a bramborářství na Českomoravské vrchovině',
    famousProductOptions: ['Brambory a sklo', 'Těžba stříbra', 'Textilní tkaní', 'Vinařství'],
    geographicalRecord: 'Ve kterém městě na Vysočině najdeme světoznámé muzeum kuriozit, rekordů a obřího mamuta?',
    geographicalRecordAnswer: 'Pelhřimov',
    geographicalRecordOptions: ['Pelhřimov', 'Humpolec', 'Jihlava', 'Telč'],
    obscureHistory: 'Jak se jmenuje poutní kostel na Zelené hoře (UNESCO), vrcholné dílo architekta Jana Blažeje Santiniho?',
    obscureHistoryAnswer: 'Kostel svatého Jana Nepomuckého',
    obscureHistoryOptions: ['Kostel svatého Jana Nepomuckého', 'Kostel svatého Jakuba', 'Bazilika svatého Prokopa', 'Kostel sv. Petra a Pavla'],
    technicalMonument: 'Které město na Vysočině má kompletně zachované renesanční náměstí obklopené třemi rybníky (UNESCO)?',
    technicalMonumentAnswer: 'Telč',
    technicalMonumentOptions: ['Telč', 'Třebíč', 'Žďár nad Sázavou', 'Bystřice nad Pernštejnem'],
    dialectOrCulture: 'Které unikátní památky byly zapsány do seznamu UNESCO v Třebíči?',
    dialectOrCultureAnswer: 'Židovská čtvrť a Bazilika sv. Prokopa',
    dialectOrCultureOptions: ['Židovská čtvrť a Bazilika sv. Prokopa', 'Renesanční zámek a pivovar', 'Středověké katakomby', 'Santiniho dvůr']
  },
  JHM: {
    highestPointName: 'Durda v Bílých Karpatech',
    highestPointHeight: 836,
    famousCastle: 'hrad Špilberk',
    mainRiver: 'Morava',
    famousProduct: 'Světoznámé víno a vinařské podoblasti Pálavy',
    famousProductOptions: ['Vynikající víno', 'Perníkové řemeslo', 'Výroba porcelánu', 'Sýry'],
    geographicalRecord: 'Která světoznámá krasová oblast skrývá propast Macocha a plavbu na podzemní říčce Punkvě?',
    geographicalRecordAnswer: 'Moravský kras',
    geographicalRecordOptions: ['Moravský kras', 'Český kras', 'Javoříčské jeskyně', 'Chýnovská jeskyně'],
    obscureHistory: 'Jaká z hlíny pálená soška nalezená na jižní Moravě je nejstarší dochovanou keramickou plastikou na světě?',
    obscureHistoryAnswer: 'Věstonická venuše',
    obscureHistoryOptions: ['Věstonická venuše', 'Willendorfská venuše', 'Kamenný pastýř', 'Keltská hlava ze Mšeckých Žehrovic'],
    technicalMonument: 'Která brněnská funkcionalistická vila architekta Miese van der Rohe je zapsána v seznamu UNESCO?',
    technicalMonumentAnswer: 'Vila Tugendhat',
    technicalMonumentOptions: ['Vila Tugendhat', 'Vila Stiassni', 'Jurkovičova vila', 'Löw-Beerova vila'],
    dialectOrCulture: 'Která rozsáhlá komponovaná krajina se zámky Lednice a Valtice je nazývána zahradou Evropy?',
    dialectOrCultureAnswer: 'Lednicko-valtický areál',
    dialectOrCultureOptions: ['Lednicko-valtický areál', 'Zahrada Pálavy', 'Slovácká krajina', 'Znojemské Poddyjí']
  },
  OLK: {
    highestPointName: 'Praděd v Jeseníkách',
    highestPointHeight: 1491,
    famousCastle: 'hrad Bouzov',
    mainRiver: 'Morava',
    famousProduct: 'Jedinečně aromatické Olomoucké tvarůžky z Loštic',
    famousProductOptions: ['Olomoucké tvarůžky', 'Pardubický perník', 'Štramberské uši', 'Vincentka kyselka'],
    geographicalRecord: 'Jak se jmenuje nejhlubší dosud zatopená propast světa s odhadovanou hloubkou přes 1 km?',
    geographicalRecordAnswer: 'Hranická propast',
    geographicalRecordOptions: ['Hranická propast', 'Macocha', 'Amatérská jeskyně', 'Býčí skála'],
    obscureHistory: 'Který mohutný morový sloup na Horním náměstí v Olomouci měří 35 metrů a je zapsán v UNESCO?',
    obscureHistoryAnswer: 'Sloup Nejsvětější Trojice',
    obscureHistoryOptions: ['Sloup Nejsvětější Trojice', 'Mariánský sloup', 'Olomoucký obelisk', 'Sloup svatého Václava'],
    technicalMonument: 'Která unikátní ruční papírna z přelomu 16. a 17. století ve Velkých Losinách stále ručně vyrábí papír?',
    technicalMonumentAnswer: 'Ruční papírna Velké Losiny',
    technicalMonumentOptions: ['Ruční papírna Velké Losiny', 'Kartounka Šumperk', 'Tkalcovna Jeseník', 'Sklárna Rapotín'],
    dialectOrCulture: 'Která úrodná moravská etnografická oblast s metropolí Olomoucí je typická hanáckým nářečím?',
    dialectOrCultureAnswer: 'Haná',
    dialectOrCultureOptions: ['Haná', 'Valašsko', 'Slovácko', 'Lašsko']
  },
  ZLK: {
    highestPointName: 'Čertův mlýn v Beskydech',
    highestPointHeight: 1027,
    famousCastle: 'Zámek Kroměříž',
    mainRiver: 'Morava',
    famousProduct: 'Vincentka a lázeňství v Luhačovicích',
    famousProductOptions: ['Vincentka minerálka', 'Kofola sirup', 'Bramborové placky', 'Becherovka'],
    geographicalRecord: 'Který legendární zakladatel obuvnického impéria uplatnil ve Zlíně funkcionalistický urbanismus?',
    geographicalRecordAnswer: 'Tomáš Baťa',
    geographicalRecordOptions: ['Tomáš Baťa', 'Emil Škoda', 'František Křižík', 'Ignác Šustala'],
    obscureHistory: 'V kterém slavném městě (UNESCO) najdeme překrásné Podzámecké a Květné zahrady zřízené biskupy?',
    obscureHistoryAnswer: 'Kroměříž',
    obscureHistoryOptions: ['Kroměříž', 'Uherské Hradiště', 'Vsetín', 'Luhačovice'],
    technicalMonument: 'Jak se jmenuje slavná vnitrozemská vodní cesta s plavebními komorami vybudovaná firmou Baťa?',
    technicalMonumentAnswer: 'Baťův kanál',
    technicalMonumentOptions: ['Baťův kanál', 'Zlínská vodní magistrála', 'Dřevnické plovadlo', 'Kanál Dunaj-Odra'],
    dialectOrCulture: 'Která barevná lidová slavnost svatodušních svátků s maskovaným králem na koni se dodnes drží ve Vlčnově?',
    dialectOrCultureAnswer: 'Jízda králů',
    dialectOrCultureOptions: ['Jízda králů', 'Slovácký verbuňk', 'Moravské dožínky', 'Valašský bál']
  },
  MSK: {
    highestPointName: 'Praděd (vrchol na pomezí)',
    highestPointHeight: 1491,
    famousCastle: 'Sovinec',
    mainRiver: 'Odra',
    famousProduct: 'Výroba těžkých nákladních automobilů Tatra v Kopřivnici',
    famousProductOptions: ['Nákladní vozy Tatra', 'Klobouky Tonak', 'Ostravské uhlí', 'Pivo Radegast'],
    geographicalRecord: 'Který úžasný ostravský industriální areál s vysokými pecemi Hlubina je zapsán na listinu Evropského dědictví?',
    geographicalRecordAnswer: 'Dolní Vítkovice',
    geographicalRecordOptions: ['Dolní Vítkovice', 'Důl Michal', 'Landek Park', 'Slezskoostravská koksovna'],
    obscureHistory: 'Jak se jmenuje bájná hora v Beskydech se sochou pohanského boha Radegasta a cyrilometodějskou kaplí?',
    obscureHistoryAnswer: 'Radhošť',
    obscureHistoryOptions: ['Radhošť', 'Lysá hora', 'Smrk', 'Javorový'],
    technicalMonument: 'Které pečivo svinuté do tvaru ucha se skořicovou příchutí se na počest r. 1241 peče ve Štramberku?',
    technicalMonumentAnswer: 'Štramberské uši',
    technicalMonumentOptions: ['Štramberské uši', 'Pardubický perník', 'Valašský frgál', 'Hořické trubičky'],
    dialectOrCulture: 'Který věhlasný ostravský rodák, malíř a ilustrátor vytvořil nezaměnitelnou knihu "Ondráš z Janovic"?',
    dialectOrCultureAnswer: 'Leoš Janáček',
    dialectOrCultureOptions: ['Leoš Janáček', 'Petr Bezruč', 'Bohumil Hrabal', 'Jarek Nohavica']
  }
};

interface CustomQuestionInput {
  question: string;
  options: string[];
  answer: string;
  category: 'Geografie & Příroda' | 'Historie & Osobnosti' | 'Památky & Města' | 'Zajímavosti & Rekordy';
}

const REGION_CUSTOM_QUESTIONS: Record<string, Record<1 | 2 | 5 | 10, CustomQuestionInput[]>> = {
  PHA: {
    1: [
      {
        question: "Jaký vrch v Praze nese monumentální jezdeckou sochu Jana Žižky z Trocnova?",
        options: ["Vítkov", "Petřín", "Vyšehrad", "Letná"],
        answer: "Vítkov",
        category: "Památky & Města"
      },
      {
        question: "Jaká slavná řeka protéká historickým centrem Prahy?",
        options: ["Vltava", "Labe", "Morava", "Jizera"],
        answer: "Vltava",
        category: "Geografie & Příroda"
      }
    ],
    2: [
      {
        question: "Která je nejstarší univerzita ve střední Evropě založená v Praze roku 1348?",
        options: ["Univerzita Karlova", "ČVUT", "Akademie výtvarných umění", "Vysoká škola chemicko-technologická"],
        answer: "Univerzita Karlova",
        category: "Historie & Osobnosti"
      },
      {
        question: "Který architekt navrhl Tančící dům v Praze spolubudovaný s Frankem Gehrym?",
        options: ["Vlado Milunić", "Jan Kaplický", "Josef Gočár", "Eva Jiřičná"],
        answer: "Vlado Milunić",
        category: "Historie & Osobnosti"
      }
    ],
    5: [
      {
        question: "Ve které pražské památce se nachází slavná Zlatá ulička s malými domky?",
        options: ["Pražský hrad", "Vyšehrad", "Karolinu", "Klementinum"],
        answer: "Pražský hrad",
        category: "Památky & Města"
      },
      {
        question: "Která pražská čtvrť byla v minulosti známá jako židovské ghetto?",
        options: ["Josefov", "Hradčany", "Podskalí", "Vyšehrad"],
        answer: "Josefov",
        category: "Památky & Města"
      }
    ],
    10: [
      {
        question: "U které pražské technické památky z roku 1911 najdeme poslední dochovaný funkční pražský orloj kromě Staroměstské radnice?",
        options: ["Vršovická vodárenská věž", "Štefánikova hvězdárna", "Novoměstská radnice", "Nuselský most"],
        answer: "Vršovická vodárenská věž",
        category: "Památky & Města"
      },
      {
        question: "V kterém roce byl slavnostně položen základní kámen Karlova mostu Karlem IV.?",
        options: ["1357", "1348", "1389", "1410"],
        answer: "1357",
        category: "Historie & Osobnosti"
      }
    ]
  },
  STC: {
    1: [
      {
        question: "Jaký slavný romantický zámek s tajuplným parkem a věží leží uprostřed Křivoklátských lesů?",
        options: ["Zámek Kokořín", "Karlštejn", "Konopiště", "Žleby"],
        answer: "Zámek Kokořín",
        category: "Památky & Města"
      },
      {
        question: "Který hrad nechal vybudovat Karel IV. jako klenotnici pro korunovační klenoty?",
        options: ["Karlštejn", "Křivoklát", "Konopiště", "Kokořín"],
        answer: "Karlštejn",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Která obec v tomto kraji byla v roce 1942 nacisty zcela vypálena a srovnána se zemí?",
        options: ["Lidice", "Ležáky", "Terezín", "Lety"],
        answer: "Lidice",
        category: "Historie & Osobnosti"
      },
      {
        question: "Které město uvidíte u slavného zámku Konopiště, posledního sídla Františka Ferdinanda d'Este?",
        options: ["Benešov", "Beroun", "Kladno", "Kutná Hora"],
        answer: "Benešov",
        category: "Památky & Města"
      }
    ],
    5: [
      {
        question: "Který český král a zakladatel Kutné Hory zavedl ražbu slavného pražského groše?",
        options: ["Václav II.", "Karel IV.", "Jan Lucemburský", "Přemysl Otakar II."],
        answer: "Václav II.",
        category: "Historie & Osobnosti"
      },
      {
        question: "Jak se nazývá chráněná krajinná oblast ve Středočeském kraji s nejhlubším vápencovým kaňonem Velká Amerika?",
        options: ["Český kras", "Křivoklátsko", "Kokořínsko", "Blaník"],
        answer: "Český kras",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Jak se nazývá barokní poutní areál v Příbrami, zasvěcený Panně Marii, stojící na zalesněném kopci?",
        options: ["Svatá Hora", "Zelená Hora", "Kutná poutní kaple", "Svatý Jan pod Skalou"],
        answer: "Svatá Hora",
        category: "Památky & Města"
      },
      {
        question: "Která slavná bitva husitských válek v roce 1434 znamenala porážku radikálních husitů sirotků a táboritů?",
        options: ["Bitva u Lipan", "Bitva u Sudoměře", "Bitva na Vítkově", "Bitva u Ústí"],
        answer: "Bitva u Lipan",
        category: "Historie & Osobnosti"
      }
    ]
  },
  JHC: {
    1: [
      {
        question: "Které jihočeské město je světoznámé svým plně zachovalým středověkým centrem zapsaným v UNESCO?",
        options: ["Český Krumlov", "Třeboň", "Jindřichův Hradec", "Písek"],
        answer: "Český Krumlov",
        category: "Památky & Města"
      },
      {
        question: "Jaká renesanční perla mezi zámky nad rybníkem Svět je hlavním sídlem rodu Rožmberků?",
        options: ["Třeboň", "Hluboká", "Červená Lhota", "Jindřichův Hradec"],
        answer: "Třeboň",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Která řeka protéká historickým Pískem a nese nejstarší dochovaný kamenný most v České republice?",
        options: ["Otava", "Vltava", "Lužnice", "Nežárka"],
        answer: "Otava",
        category: "Geografie & Příroda"
      },
      {
        question: "Které hnutí a město založili husité v jižních Čechách jako své revoluční a vojenské centrum?",
        options: ["Tábor", "Písek", "Prachatice", "Strakonice"],
        answer: "Tábor",
        category: "Historie & Osobnosti"
      }
    ],
    5: [
      {
        question: "Jak se jmenuje pohádkově červený renesanční vodní zámek stojící na ostrově uprostřed rybníka v tomto kraji?",
        options: ["Červená Lhota", "Hluboká", "Orlík", "Blatná"],
        answer: "Červená Lhota",
        category: "Památky & Města"
      },
      {
        question: "Jak se nazývá největší přehradní nádrž v ČR ležící na Vltavě na Šumavě, přezdívaná jihočeské moře?",
        options: ["Lipno", "Orlík", "Římov", "Slapy"],
        answer: "Lipno",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Jak se jmenuje jihočeský hrad tyčící se nad soutokem Otavy a Vltavy, považovaný za jedno ze sídel krále Václava IV.?",
        options: ["Zvíkov", "Orlík", "Rožmberk", "Landštejn"],
        answer: "Zvíkov",
        category: "Historie & Osobnosti"
      },
      {
        question: "Které jihočeské rašeliniště na Šumavě drží četné mrazové rekordy a je jedním z nejchladnějších trvale monitorovaných míst v ČR?",
        options: ["Jezerní slať", "Chalupská slať", "Boubínská mýtina", "Tříjezerní slať"],
        answer: "Jezerní slať",
        category: "Geografie & Příroda"
      }
    ]
  },
  PLZ: {
    1: [
      {
        question: "Které západočeské město je celosvětově známé výrobou piva a dóm s nejvyšší kostelní věží?",
        options: ["Plzeň", "Klatovy", "Sušice", "Rokycany"],
        answer: "Plzeň",
        category: "Památky & Města"
      },
      {
        question: "Který klenot na Klatovsku je největší zříceninou hradu v České republice?",
        options: ["Rabí", "Kašperk", "Velhartice", "Švihov"],
        answer: "Rabí",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Jak se nazývá druhá největší synagoga v Evropě, s typickými věžemi, která se pyšní skvělou akustikou v Plzni?",
        options: ["Velká synagoga v Plzni", "Španělská synagoga", "Jeruzalémská synagoga", "Židovská synagoga v Brně"],
        answer: "Velká synagoga v Plzni",
        category: "Památky & Města"
      },
      {
        question: "Který unikátní vodní hrad z 15. století s vodním příkopem leží u Klatov a jmenuje se Švihov?",
        options: ["Švihov", "Rabí", "Točník", "Kokořín"],
        answer: "Švihov",
        category: "Památky & Města"
      }
    ],
    5: [
      {
        question: "Která řeka vzniká v Plzni splynutím čtyř řek Mže, Radbuzy, Úhlavy a Úslavy?",
        options: ["Berounka", "Vltava", "Otava", "Střela"],
        answer: "Berounka",
        category: "Geografie & Příroda"
      },
      {
        question: "Které hluboké šumavské jezero ledovcového původu nedaleko Železné Rudy je největším přírodním jezerem v celé ČR?",
        options: ["Černé jezero", "Čertovo jezero", "Laka", "Prášilské jezero"],
        answer: "Černé jezero",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Jak se nazývá tajuplný klášter benediktinů v Plzeňském kraji, jehož kostel Nanebevzetí Panny Marie navrhl Jan Blažej Santini?",
        options: ["Kladruby u Stříbra", "Plasy", "Mariánská Týnice", "Nepomuk"],
        answer: "Kladruby u Stříbra",
        category: "Památky & Města"
      },
      {
        question: "Která významná osobnost českého baroka, sochař a autor soch ctností a neřestí, pocházel z Plzeňského kraje, konkrétně z Nečtin?",
        options: ["Ondřej Filip Quitainer", "Matyáš Bernard Braun", "Jan Jiří Bendl", "Ferdinand Maxmilián Brokoff"],
        answer: "Ondřej Filip Quitainer",
        category: "Historie & Osobnosti"
      }
    ]
  },
  KVK: {
    1: [
      {
        question: "S kterým vzácným radioaktivním kovem je neodmyslitelně spjata hornická historie Jáchymova v Krušných horách?",
        options: ["Uran a stříbro", "Zlato a platina", "Uhlí a bronz", "Cín a zinek"],
        answer: "Uran a stříbro",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "S kterým proslulým českým králem je spojena legenda o založení lázní Karlovy Vary po uštvání jelena?",
        options: ["Karel IV.", "Václav II.", "Rudolf II.", "Jiří z Poděbrad"],
        answer: "Karel IV.",
        category: "Historie & Osobnosti"
      }
    ],
    2: [
      {
        question: "Které vyhlášené lázeňské město se zpívající fontánou tvoří s Karlovými Vary a Františkovými Lázněmi lázeňský trojúhelník UNESCA?",
        options: ["Mariánské Lázně", "Jáchymov", "Kynžvart", "Kraslice"],
        answer: "Mariánské Lázně",
        category: "Památky & Města"
      },
      {
        question: "Která romantická a hluboká řeka tvoří malebné meandry kolem středověkého hradu Loket?",
        options: ["Ohře", "Berounka", "Mže", "Teplá"],
        answer: "Ohře",
        category: "Geografie & Příroda"
      }
    ],
    5: [
      {
        question: "Která slavná západočeská památka a její románsko-gotický hrad skrývá drahocenný zlatý Relikviář svatého Maura?",
        options: ["Zámek Bečov nad Teplou", "Hrad Loket", "Zámek Kynžvart", "Hrad Seeberg"],
        answer: "Zámek Bečov nad Teplou",
        category: "Památky & Města"
      },
      {
        question: "Jak se jmenuje přírodní rezervace s aktivními bahenními sopkami (mofetami) a rašeliništěmi u Františkových Lázní?",
        options: ["SOOS", "Kladská u Mariánských Lázní", "Božídarské rašeliniště", "Svatošské skály"],
        answer: "SOOS",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Který světoznámý fyzik, matematik a filozof, po němž se jmenuje jednotka rychlosti zvuku, se narodil blízko Chebu?",
        options: ["Ernst Mach", "Heinrich Hertz", "Christian Doppler", "Albert Einstein"],
        answer: "Ernst Mach",
        category: "Historie & Osobnosti"
      },
      {
        question: "Která známá osobnost světové literatury se léčila v Karlových Varech a prožila zde osudovou lásku k mladé Ulrice von Levetzow?",
        options: ["Johann Wolfgang von Goethe", "Friedrich Schiller", "Franz Kafka", "William Shakespeare"],
        answer: "Johann Wolfgang von Goethe",
        category: "Historie & Osobnosti"
      }
    ]
  },
  ULK: {
    1: [
      {
        question: "Která majestátní zřícenina hradu na čedičové skále tvoří nepřehlédnutelnou dominantu dolního Polabí u Litoměřic?",
        options: ["Hazmburk", "Střekov", "Kost", "Kokořín"],
        answer: "Hazmburk",
        category: "Památky & Města"
      },
      {
        question: "Které město v Ústeckém kraji proslulo jako centrum chmelařství a razí vlastní pivo z Žateckého chmele?",
        options: ["Žatec", "Most", "Louny", "Kadaň"],
        answer: "Žatec",
        category: "Zajímavosti & Rekordy"
      }
    ],
    2: [
      {
        question: "Která malebná chráněná krajinná oblast láká na pískovcové skalní věže a pravěkou Pravčickou bránu?",
        options: ["České Švýcarsko", "Krušné hory", "Kokořínsko", "České středohoří"],
        answer: "České Švýcarsko",
        category: "Geografie & Příroda"
      },
      {
        question: "Který hrad tyčící se na skále přímo nad Labem v Ústí nad Labem navštívil Richard Wagner a složil tam operu Tannhäuser?",
        options: ["Střekov", "Hněvín", "Hazmburk", "Kadaňský hrad"],
        answer: "Střekov",
        category: "Historie & Osobnosti"
      }
    ],
    5: [
      {
        question: "Která památná hora s románskou rotundou svatého Jiří vystupuje z roviny Polabí a pojí se s legendou o Praotci Čechovi?",
        options: ["Říp", "Milešovka", "Lovoš", "Hazmburk"],
        answer: "Říp",
        category: "Geografie & Příroda"
      },
      {
        question: "Jak se jmenuje hora s meteorologickou stanicí v Českém středohoří, která drží titul největrnější hory Česka?",
        options: ["Milešovka", "Bouřňák", "Klíny", "Raná"],
        answer: "Milešovka",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Která mimořádná technická operace proběhla roku 1975 v Mostě kvůli těžbě hnědého uhlí k záchraně chrámu?",
        options: ["Přesun gotického kostela Nanebevzetí Panny Marie na kolejích", "Zasypání dolu pískem", "Exhumace celého středověkého hřbitova", "Demontáž chrámu"],
        answer: "Přesun gotického kostela Nanebevzetí Panny Marie na kolejích",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Který historický zámek zapsaný s krásným parkem je spojen s pobytem slavného dobrodruha a svůdce Giacoma Casanovy u Duchcova?",
        options: ["Zámek Duchcov", "Zámek Libochovice", "Zámek Ploskovice", "Zámek Klášterec nad Ohří"],
        answer: "Zámek Duchcov",
        category: "Historie & Osobnosti"
      }
    ]
  },
  LBK: {
    1: [
      {
        question: "Který renesanční a gotický hradní komplex nad Jizerou, dříve držený Albrechtem z Valdštejna, střeží bránu na severu?",
        options: ["Frýdlant", "Grabštejn", "Lemberk", "Bezděz"],
        answer: "Frýdlant",
        category: "Památky & Města"
      },
      {
        question: "Jak se jmenuje hora s ikonickým vysílačem a hotelem ve tvaru rotačního hyperboloidu, symbolem Liberecka?",
        options: ["Ještěd", "Smrk", "Kotel", "Černá hora"],
        answer: "Ještěd",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Které malebné jezero na Českolipsku inspirovalo Karla Hynka Máchu k sepsání slavné básně Máj?",
        options: ["Máchovo jezero", "Hamerák", "Novozámecký rybník", "Kristýna"],
        answer: "Máchovo jezero",
        category: "Historie & Osobnosti"
      },
      {
        question: "Které pohoří, proslulé rašeliništi a tradičním startem Jizerské padesátky, leží severně od Liberce?",
        options: ["Jizerské hory", "Krkonoše", "Lužické hory", "Ještědský hřbet"],
        answer: "Jizerské hory",
        category: "Geografie & Příroda"
      }
    ],
    5: [
      {
        question: "Jak se jmenuje slavná čedičová skála s pravidelnými šestibokými sloupci u Kamenického Šenova nazývaná Kamenné varhany?",
        options: ["Panská skála", "Suché skály", "Borecké skály", "Sloní kameny"],
        answer: "Panská skála",
        category: "Geografie & Příroda"
      },
      {
        question: "Které pohádkově divoké skalní město s labyrintem tajuplných průchodů leží v Českém ráji kousek od Turnova?",
        options: ["Hruboskalsko", "Besedické skály", "Prachovské skály", "Tisá skály"],
        answer: "Hruboskalsko",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Která svatá léčitelka, patronka rodin a chudých, žila ve 13. století na hradě Lemberk a založila špitály?",
        options: ["Svatá Zdislava z Lemberka", "Svatá Ludmila", "Svatá Anežka Česká", "Eliška Rejčka"],
        answer: "Svatá Zdislava z Lemberka",
        category: "Historie & Osobnosti"
      },
      {
        question: "Která sklářská manufaktura v Poniklé byla zapsána na seznam nehmotného dědictví UNESCO díky ruční výrobě ozdob z foukaných skleněných perlí?",
        options: ["Rautis", "Preciosa", "Moser", "Lasvit"],
        answer: "Rautis",
        category: "Zajímavosti & Rekordy"
      }
    ]
  },
  HKK: {
    1: [
      {
        question: "Které pohoří s nejvyšší horou Sněžkou tvoří přírodní dominantu Královéhradecka?",
        options: ["Krkonoše", "Orlické hory", "Jizerské hory", "Rychleby"],
        answer: "Krkonoše",
        category: "Geografie & Příroda"
      },
      {
        question: "Které město v Královéhradeckém kraji nese přezdívku 'Salón republiky' díky moderní architektuře Gočára?",
        options: ["Hradec Králové", "Náchod", "Trutnov", "Jičín"],
        answer: "Hradec Králové",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Který tajuplný renesanční zámek na skále u řeky Metuje navrhl Dušan Jurkovič a je spojen s rodem Bartoňů?",
        options: ["Nové Město nad Metují", "Opočno", "Ratibořice", "Rychnov nad Kněžnou"],
        answer: "Nové Město nad Metují",
        category: "Památky & Města"
      },
      {
        question: "Jak se jmenuje údolí u zámku Ratibořice spojené s osudem postav z knížky Babička?",
        options: ["Babiččino údolí", "Údolí Úpy", "Smetanovo údolí", "Divoké údolí"],
        answer: "Babiččino údolí",
        category: "Historie & Osobnosti"
      }
    ],
    5: [
      {
        question: "Přes které skalní město s útvary jako Prachovská jehla vede slavný turistický okruh Českého ráje?",
        options: ["Prachovské skály", "Adršpašské skály", "Teplické skály", "Hrubá skála"],
        answer: "Prachovské skály",
        category: "Geografie & Příroda"
      },
      {
        question: "Ve kterém městě na Královéhradecku najdeme unikátní safari zoo s africkými zvířaty?",
        options: ["Dvůr Králové nad Labem", "Jaroměř", "Trutnov", "Náchod"],
        answer: "Dvůr Králové nad Labem",
        category: "Zajímavosti & Rekordy"
      }
    ],
    10: [
      {
        question: "Jak se jmenuje slavná přehrada na řece Labi u Dvora Králové, postavená v secesním stylu s romantickými věžičkami?",
        options: ["Les Království", "Labská přehrada", "Rozkoš", "Pastviny"],
        answer: "Les Království",
        category: "Památky & Města"
      },
      {
        question: "Která osudová bitva prusko-rakouské války roku 1866 proběhla nedaleko Hradce Králové?",
        options: ["Bitva u Hradce Králové (Chlumu)", "Bitva u Náchoda", "Bitva u Trutnova", "Bitva u Jičína"],
        answer: "Bitva u Hradce Králové (Chlumu)",
        category: "Historie & Osobnosti"
      }
    ]
  },
  PAK: {
    1: [
      {
        question: "Která sladká medová pochoutka zdobená polevou proslavila Pardubice po celé Evropě?",
        options: ["Pardubický perník", "Hořické trubičky", "Štramberské uši", "Lázeňské oplatky"],
        answer: "Pardubický perník",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "S kterým českým aviatikem a průkopníkem létání, který vynesl první letadlo, je spojeno Pardubicko?",
        options: ["Jan Kašpar", "Metoděj Vlach", "František Křižík", "Karel Klostermann"],
        answer: "Jan Kašpar",
        category: "Historie & Osobnosti"
      }
    ],
    2: [
      {
        question: "Který goticko-renesanční zámek tyčící se na osamělé Kunětické hoře je přezdívaný 'Rumburakův hrad' z Arabely?",
        options: ["Kunětická hora", "Žleby", "Potštejn", "Litomyšl"],
        answer: "Kunětická hora",
        category: "Památky & Města"
      },
      {
        question: "Který národní hřebčín, památka UNESCO chovající starokladrubské koně již od roku 1579, leží u Pardubic?",
        options: ["Kladruby nad Labem", "Slatiňany", "Kladrubec", "Equus Heřmanův Městec"],
        answer: "Kladruby nad Labem",
        category: "Zajímavosti & Rekordy"
      }
    ],
    5: [
      {
        question: "Který zámek v Pardubickém kraji, renesanční památka UNESCO s grafity a divadelním festivalem, proslavil Smetanu?",
        options: ["Zámek Litomyšl", "Zámek Slatiňany", "Zámek Nové Hrady", "Zámek Choltice"],
        answer: "Zámek Litomyšl",
        category: "Památky & Města"
      },
      {
        question: "Které pohoří s nejvyšším bodem Devět skal ohraničuje jihozápadní část Pardubického kraje?",
        options: ["Železné hory", "Orlické hory", "Králický Sněžník", "Beskydy"],
        answer: "Železné hory",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Který nejdelší visutý most pro pěší na světě (Sky Bridge 721) překonává horské údolí na Dolní Moravě?",
        options: ["Sky Bridge 721", "Zemská brána", "Svitavský most", "Bechyňská duha"],
        answer: "Sky Bridge 721",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Která technická památka – unikátní vodní kanál z 15. století napájející rybníky z Opatovic – protéká Pardubickem?",
        options: ["Opatovický kanál", "Baťův kanál", "Schwarzenberský kanál", "Zlatá stoka"],
        answer: "Opatovický kanál",
        category: "Zajímavosti & Rekordy"
      }
    ]
  },
  VYS: {
    1: [
      {
        question: "Které starobylé stříbrné město je sídelním městem kraje Vysočina a ukrývá rozsáhlé podzemní katakomby?",
        options: ["Jihlava", "Třebíč", "Humpolec", "Žďár nad Sázavou"],
        answer: "Jihlava",
        category: "Památky & Města"
      },
      {
        question: "Které město na Vysočině má své historické náměstí zaneseno v UNESCO díky renesanční scenérii?",
        options: ["Telč", "Jihlava", "Humpolec", "Třebíč"],
        answer: "Telč",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Která románsko-gotická bazilika s židovskou čtvrtí a hřbitovem v Třebíči je chráněna jako památka UNESCO?",
        options: ["Bazilika svatého Prokopa", "Svatojánská rotunda", "Kostel sv. Jakuba", "Kostel svatého Jiljí"],
        answer: "Bazilika svatého Prokopa",
        category: "Památky & Města"
      },
      {
        question: "Jak se jmenuje poutní kostel na Zelené hoře u Žďáru, vrcholné dílo barokní gotiky od Santiniho na půdorysu pěticípé hvězdy?",
        options: ["Kostel svatého Jana Nepomuckého", "Kostel svatého Petra a Pavla", "Zelenohorská kaple", "Kostel Nanebevzetí"],
        answer: "Kostel svatého Jana Nepomuckého",
        category: "Památky & Města"
      }
    ],
    5: [
      {
        question: "Jak se nazývá majestátní, zachovalý kamenný hrad s mramorovou věží ze 13. století stojící na skalním ostrohu?",
        options: ["Pernštejn", "Lipnice nad Sázavou", "Roštejn", "Kámen"],
        answer: "Pernštejn",
        category: "Památky & Města"
      },
      {
        question: "Která malebná chráněná krajinná oblast se skalními útvary jako Devět skal se nachází na pomezí Vysočiny?",
        options: ["Žďárské vrchy", "Železné hory", "Blaník", "Český kras"],
        answer: "Žďárské vrchy",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Ve kterém městě na západě Vysočiny sídlí slavná agentura Dobrý den, která spravuje české Knihy rekordů?",
        options: ["Pelhřimov", "Humpolec", "Pacov", "Počátky"],
        answer: "Pelhřimov",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Který významný český básník a dramatik, autor děl Kytice, bydlel a tvořil v klášteře v Želivě?",
        options: ["Karel Jaromír Erben", "Karel Hynek Mácha", "František Halas", "Vítězslav Nezval"],
        answer: "Karel Jaromír Erben",
        category: "Historie & Osobnosti"
      }
    ]
  },
  JHM: {
    1: [
      {
        question: "Která moravská metropole s hradem Špilberk a vilou Tugendhat dominuje Jihomoravskému kraji?",
        options: ["Brno", "Znojmo", "Mikulov", "Břeclav"],
        answer: "Brno",
        category: "Památky & Města"
      },
      {
        question: "Jaké malebné vinařské město s renesančním zámkem leží na úpatí chráněných pálavských kopců?",
        options: ["Mikulov", "Znojmo", "Hustopeče", "Vizovice"],
        answer: "Mikulov",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Jak se nazývá proslulá krasová oblast s více než tisícem jeskyní a s nejhlubší propastí Macocha?",
        options: ["Moravský kras", "Český kras", "Javoříčský kras", "Hranická propast"],
        answer: "Moravský kras",
        category: "Geografie & Příroda"
      },
      {
        question: "Které chráněné území na Jihomoravsku s ledovcovými údolími u rakouské hranice je naším nejmenším národním parkem?",
        options: ["Národní park Podyjí", "Národní park Šumava", "Národní park České Švýcarsko", "Pálavská rezervace"],
        answer: "Národní park Podyjí",
        category: "Geografie & Příroda"
      }
    ],
    5: [
      {
        question: "Jak se nazývá rozsáhlý zámecký a parkový komplex zapsaný v UNESCO, budovaný rodem Lichtenštejnů?",
        options: ["Lednicko-valtický areál", "Zámek Mikulov", "Zámek Milotice", "Zámek Vranov nad Dyjí"],
        answer: "Lednicko-valtický areál",
        category: "Památky & Města"
      },
      {
        question: "U kterého města na jižní Moravě proběhla roku 1805 osudová bitva tří císařů?",
        options: ["Slavkov u Brna (Austerlitz)", "Vyškov", "Znojmo", "Hustopeče"],
        answer: "Slavkov u Brna (Austerlitz)",
        category: "Historie & Osobnosti"
      }
    ],
    10: [
      {
        question: "Která hliněná soška nahé ženy z dob paleolitu nalezená u vsi Dolní Věstonice je nejstarší keramickou plastikou světa?",
        options: ["Věstonická venuše", "Willendorfská venuše", "Zlatá soška pravěku", "Trójská Venuše"],
        answer: "Věstonická venuše",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Který vědec a biolog prováděl své historické pokusy s genetikou a křížením hrachu v brněnském klášteře?",
        options: ["Gregor Johann Mendel", "Jan Evangelista Purkyně", "Nikola Tesla", "Albert Einstein"],
        answer: "Gregor Johann Mendel",
        category: "Historie & Osobnosti"
      }
    ]
  },
  OLK: {
    1: [
      {
        question: "Které malebné pohoří s nejvyšším moravským vrcholem Praděd dominuje severu Olomouckého kraje?",
        options: ["Jeseníky", "Beskydy", "Oderské vrchy", "Kralický Sněžník"],
        answer: "Jeseníky",
        category: "Geografie & Příroda"
      },
      {
        question: "Které historické hanácké město s morovým sloupem Nejsvětější Trojice je krajským sídlem?",
        options: ["Olomouc", "Prostějov", "Přerov", "Šumperk"],
        answer: "Olomouc",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "Ve které lázeňské vesničce v Jeseníkách, známé dřevěnými pavilony, vyvěrají léčivé kyselky?",
        options: ["Karlova Studánka", "Velké Losiny", "Priessnitzovy lázně", "Bludov"],
        answer: "Karlova Studánka",
        category: "Památky & Města"
      },
      {
        question: "Která významná a aromatická sýrová pochoutka s tradicí výroby v Lošticích proslavila Olomoucko?",
        options: ["Olomoucké tvarůžky", "Hermelín", "Niva", "Sýr Lučina"],
        answer: "Olomoucké tvarůžky",
        category: "Zajímavosti & Rekordy"
      }
    ],
    5: [
      {
        question: "Který romantický pohádkový hrad s válcovou věží střežící údolí Hané proslul scénami z pohádek?",
        options: ["Bouzov", "Helfštýn", "Šternberk", "Mírov"],
        answer: "Bouzov",
        category: "Památky & Města"
      },
      {
        question: "Jak se jmenuje nejhlubší zatopená sladkovodní propast na světě s prokázanou hloubkou ležící u Hranic?",
        options: ["Hranická propast", "Macocha", "Sloupské jeskyně", "Býčí skála"],
        answer: "Hranická propast",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Která unikátní ruční papírna ze 16. století, v níž se dodnes ručně list po listu vyrábí papír, leží u Šumperka?",
        options: ["Ruční papírna Velké Losiny", "Papírna v Olomouci", "Jeseník papírna", "Papírna Loučná"],
        answer: "Ruční papírna Velké Losiny",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Který mimořádný barokní morový sloup na Horním náměstí v Olomouci měří 35 metrů a je v UNESCO?",
        options: ["Sloup Nejsvětější Trojice", "Mariánský sloup v Olomouci", "Sloup svatého Václava", "Hanácký obelisk"],
        answer: "Sloup Nejsvětější Trojice",
        category: "Památky & Města"
      }
    ]
  },
  ZLK: {
    1: [
      {
        question: "Které lázeňské město se secesními lidovými stavbami od architekta Dušana Jurkoviče je největším na Moravě?",
        options: ["Luhačovice", "Vizovice", "Rožnov", "Brumov"],
        answer: "Luhačovice",
        category: "Památky & Města"
      },
      {
        question: "S kterým slavným obuvnickým králem, průkopníkem moderního funkcionalismu, je spojeno krajské město Zlín?",
        options: ["Tomáš Baťa", "Emil Škoda", "František Křižík", "Ignác Šustala"],
        answer: "Tomáš Baťa",
        category: "Historie & Osobnosti"
      }
    ],
    2: [
      {
        question: "Které město se svými biskupskými Podzámeckými a Květnými zahradami je perlou UNESCO na západě Zlínska?",
        options: ["Kroměříž", "Zlín", "Vsetín", "Uherské Hradiště"],
        answer: "Kroměříž",
        category: "Památky & Města"
      },
      {
        question: "Jak se nese název historického plavebního kanálu vybudovaného k přepravě lignitu firmou Baťa?",
        options: ["Baťův kanál", "Zlínská struha", "Moravský kanál", "Zemědělský kanál"],
        answer: "Baťův kanál",
        category: "Zajímavosti & Rekordy"
      }
    ],
    5: [
      {
        question: "Jak se nazývá největší muzeum v přírodě (skanzen) ve střední Evropě, ležící na Valašsku?",
        options: ["Valašské muzeum v přírodě v Rožnově pod Radhoštěm", "Skanzen Strážnice", "Skanzen Veselý Kopec", "Skanzen Zubrnice"],
        answer: "Valašské muzeum v přírodě v Rožnově pod Radhoštěm",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Která barevná svatodušní lidová tradice s maskovaným mladým králem na koni se dodnes drží ve Vlčnově?",
        options: ["Jízda králů", "Slovácký verbuňk", "Hanácké hody", "Masopustní bál"],
        answer: "Jízda králů",
        category: "Zajímavosti & Rekordy"
      }
    ],
    10: [
      {
        question: "Který moravský klášter ze 13. století nese status významného poutního místa u Uherského Hradiště?",
        options: ["Velehrad", "Svatý Hostýn", "Porta Coeli", "Rajhrad"],
        answer: "Velehrad",
        category: "Památky & Města"
      },
      {
        question: "Jaké slavné pohoří s nejvyšším vrcholem Velká Javořina tvoří přirozenou hranici mezi Moravou a Slovenskem?",
        options: ["Bílé Karpaty", "Moravskoslezské Beskydy", "Hostýnské vrchy", "Valašská vrchovina"],
        answer: "Bílé Karpaty",
        category: "Geografie & Příroda"
      }
    ]
  },
  MSK: {
    1: [
      {
        question: "Které industriální krajské město zažilo slávu těžby černého uhlí a chlubí se památkou Dolní Vítkovice?",
        options: ["Ostrava", "Karviná", "Opava", "Havířov"],
        answer: "Ostrava",
        category: "Památky & Města"
      },
      {
        question: "Které město s krásným renesančním zámkem a muzeem klobouků Tonak leží v podhůří Beskyd?",
        options: ["Nový Jičín", "Frýdek-Místek", "Kopřivnice", "Bruntál"],
        answer: "Nový Jičín",
        category: "Památky & Města"
      }
    ],
    2: [
      {
        question: "S kterou legendární značkou českých nákladních a armádních vozů je spjato město Kopřivnice s novým muzeem?",
        options: ["Tatra", "Praga", "Škoda", "Liaz"],
        answer: "Tatra",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Jak se jmenuje bájná beskydská hora, v jejímž sedle stojí socha pohanského boha úrody a hojnosti Radegasta?",
        options: ["Radhošť", "Lysá hora", "Smrk", "Malý Smrk"],
        answer: "Radhošť",
        category: "Geografie & Příroda"
      }
    ],
    5: [
      {
        question: "Jak se nazývá aromatické perníkové pečivo stočené do tvaru lidského ucha vyráběné ve Štramberku?",
        options: ["Štramberské uši", "Valašský frgál", "Pardubický perníček", "Hořická tručka"],
        answer: "Štramberské uši",
        category: "Zajímavosti & Rekordy"
      },
      {
        question: "Která beskydská hora, nejvyšší vrchol Moravskoslezských Beskyd, nese přezdívku 'Královna Beskyd'?",
        options: ["Lysá hora", "Radhošť", "Smrk", "Javorový vrch"],
        answer: "Lysá hora",
        category: "Geografie & Příroda"
      }
    ],
    10: [
      {
        question: "Který světoznámý skladatel, autor monumentální opery Příhody lišky Bystroušky, se narodil blízko zříceniny Hukvaldy?",
        options: ["Leoš Janáček", "Antonín Dvořák", "Gustav Mahler", "Bohuslav Martinů"],
        answer: "Leoš Janáček",
        category: "Historie & Osobnosti"
      },
      {
        question: "Jak se jmenuje nejstarší dochovaný barokní dřevěný kostel v regionu ležící v obci Gutech u Třince?",
        options: ["Kostel Božího Těla v Gutech", "Kostel svatého Petra v Karviné", "Kostel svatého Jakuba v Opavě", "Kostel svaté Kateřiny v Ostravě"],
        answer: "Kostel Božího Těla v Gutech",
        category: "Památky & Města"
      }
    ]
  }
};

// Pomocná funkce pro bezpečné zamíchání pole (Fisher-Yates)
const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Generátor otázek zaručující 20 otázek na kraj s perfektní obtížností:
// 5x 1 bod (lehké), 5x 2 body (střední), 5x 5 bodů (velmi těžké), 5x 10 bodů (nejtěžší)
export const getQuestionsForRegion = (regionId: string): Question[] => {
  const info = REGIONS[regionId];
  const facts = REGION_FACTS[regionId];
  if (!info || !facts) return [];

  const list: Question[] = [];

  // Načtení případných doplňkových custom otázek z naší nové databáze
  const customRegionData = REGION_CUSTOM_QUESTIONS[regionId] || { 1: [], 2: [], 5: [], 10: [] };

  // 1-bodové lehké otázky (Základní identifikace, krajské město, slavné hrady)
  const baseEasy = [
    {
      question: `Jaké je krajské město kraje: ${info.name}?`,
      options: [info.capital, 'Praha', 'Brno', 'Ostrava'],
      answer: info.capital,
      category: 'Památky & Města' as const
    },
    {
      question: `Která proslavená památka (hrad či zámek) patří mezi nejnavštěvovanější v kraji: ${info.name}?`,
      options: [facts.famousCastle, 'Karlštejn', 'Hluboká', 'Bouzov'].filter((val, i, arr) => arr.indexOf(val) === i).slice(0, 4),
      answer: facts.famousCastle,
      category: 'Památky & Města' as const
    },
    {
      question: `Jak se zkráceně v běžné mluvě nazývá ${info.name}?`,
      options: [`${info.shortName} kraj`, 'Hanácký kraj', 'Slezský kraj', 'Západočeský kraj'],
      answer: `${info.shortName} kraj`,
      category: 'Zajímavosti & Rekordy' as const
    },
    {
      question: `Je pravdou, že se město ${info.capital} nachází na území regionu spravovaného jako ${info.name}?`,
      options: ['Ano, je to správně', 'Ne, leží v jiném kraji', 'Leží přesně na hranici rozhraní', 'Historicky ano, nyní ne'],
      answer: 'Ano, je to správně',
      category: 'Geografie & Příroda' as const
    },
    {
      question: `Jak se ve tvaru přídavného jména tvoří označení pro věci pocházející z krajského města ${info.capital}?`,
      options: [`${info.capital.substring(0, info.capital.length - 1)}ský`, 'Pražský', 'Moravský', 'Český'],
      answer: `${info.capital.substring(0, info.capital.length - 1)}ský`,
      category: 'Zajímavosti & Rekordy' as const
    }
  ];

  // 2-bodové středně těžké otázky (Základní geografie, vrcholy, řeky, obyvatelé)
  const baseMedium = [
    {
      question: `Která významná řeka, protékající krajem ${info.name}, je klíčovou vodní tepnou tohoto regionu?`,
      options: [facts.mainRiver, 'Sázava', 'Úpa', 'Střela'].filter((val, i, arr) => arr.indexOf(val) === i).slice(0, 4),
      answer: facts.mainRiver,
      category: 'Geografie & Příroda' as const
    },
    {
      question: `Jak se jmenuje nejvyšší vrchol (hora) v kraji: ${info.name}?`,
      options: [facts.highestPointName, 'Sněžka', 'Praděd', 'Velký Javor'].filter((val, i, arr) => arr.indexOf(val) === i).slice(0, 4),
      answer: facts.highestPointName,
      category: 'Geografie & Příroda' as const
    },
    {
      question: `Do jaké nadmořské výšky ční nejvyšší hora kraje ${info.name} (${facts.highestPointName})?`,
      options: [`${facts.highestPointHeight} m n. m.`, '1603 m n. m.', '837 m n. m.', '1244 m n. m.'].filter((val, i, arr) => arr.indexOf(val) === i).slice(0, 4),
      answer: `${facts.highestPointHeight} m n. m.`,
      category: 'Geografie & Příroda' as const
    },
    {
      question: `Jak se nejčastěji nazývá obyvatel žijící v krajském sídle ${info.capital}?`,
      options: [`Obyvatel města ${info.capital}`, 'Pražan', 'Ostravan', 'Brňan'],
      answer: `Obyvatel města ${info.capital}`,
      category: 'Zajímavosti & Rekordy' as const
    },
    {
      question: `Na kterém zemském a historickém území leží převážná většina rozlohy kraje: ${info.name}?`,
      options: ['Čechy nebo Morava (podle geografické polohy)', 'Pouze Slezsko', 'Lužice', 'Západočeské knížectví'],
      answer: 'Čechy nebo Morava (podle geografické polohy)',
      category: 'Historie & Osobnosti' as const
    }
  ];

  // 5-bodové velmi těžké otázky (Známé produkty, regionální rekordy, tradice, lázně)
  const baseHeavy = [
    {
      question: `Která slavná značka, chlouba řemesla či světoznámý produkt je tradičním symbolem spojeným s krajem: ${info.name}?`,
      options: facts.famousProductOptions,
      answer: facts.famousProduct,
      category: 'Zajímavosti & Rekordy' as const
    },
    {
      question: facts.geographicalRecord,
      options: facts.geographicalRecordOptions,
      answer: facts.geographicalRecordAnswer,
      category: 'Geografie & Příroda' as const
    },
    {
      question: `Jaký biologický ekosystém je chráněn ve vyhlášených chráněných krajinných oblastech v kraji ${info.name}?`,
      options: ['Středoevropská podhorská i nížinná fauna a flóra', 'Deštný tajuplný prales', 'Subkontinentální step', 'Písečné duny pouštního typu'],
      answer: 'Středoevropská podhorská i nížinná fauna a flóra',
      category: 'Geografie & Příroda' as const
    },
    {
      question: `Která z těchto městských památkových zón se nachází na území kraje ${info.name}?`,
      options: [info.capital, 'Los Angeles', 'Tokio', 'Sydney'],
      answer: info.capital,
      category: 'Památky & Města' as const
    },
    {
      question: `Ve kterém regionálním muzeu najdeme nejvíce expozic věnovaných historii a tradicím kraje ${info.name}?`,
      options: [`Vlastivědné muzeum kraje ${info.shortName}`, 'Národní muzeum v Praze', 'Moravské zemské muzeum', 'Technické muzeum'],
      answer: `Vlastivědné muzeum kraje ${info.shortName}`,
      category: 'Historie & Osobnosti' as const
    }
  ];

  // 10-bodové nejtěžší otázky (Hluboká lokální historie, unikátní staré pověsti, rekordy)
  const baseMaster = [
    {
      question: facts.obscureHistory,
      options: facts.obscureHistoryOptions,
      answer: facts.obscureHistoryAnswer,
      category: 'Historie & Osobnosti' as const
    },
    {
      question: facts.technicalMonument,
      options: facts.technicalMonumentOptions,
      answer: facts.technicalMonumentAnswer,
      category: 'Památky & Města' as const
    },
    {
      question: facts.dialectOrCulture,
      options: facts.dialectOrCultureOptions,
      answer: facts.dialectOrCultureAnswer,
      category: 'Zajímavosti & Rekordy' as const
    },
    {
      question: `Které slavné staré listiny z české archeologie či historie se poprvé zmiňují o osídlení v oblasti dnešního kraje ${info.name}?`,
      options: [`Starodávné kroniky a zakládající listiny biskupství či klášterů v ${info.shortName}`, 'Charta 77', 'Zlatá bula sicilská', 'Mnichovská dohoda'],
      answer: `Starodávné kroniky a zakládající listiny biskupství či klášterů v ${info.shortName}`,
      category: 'Historie & Osobnosti' as const
    },
    {
      question: `Které specifické klimatické a srážkové poměry charakterizují nehostinná vrcholová místa v kopcích kraje ${info.name}?`,
      options: ['Mírné středoevropské vnitrozemské klima s horskými vlivy', 'Tropické pásmo deště', 'Pouštní sucho', 'Trvalý polární mráz bez střídání období'],
      answer: 'Mírné středoevropské vnitrozemské klima s horskými vlivy',
      category: 'Geografie & Příroda' as const
    }
  ];

  // Blending custom and static questions per points tier
  const easyPool = [...baseEasy, ...customRegionData[1]];
  const mediumPool = [...baseMedium, ...customRegionData[2]];
  const heavyPool = [...baseHeavy, ...customRegionData[5]];
  const masterPool = [...baseMaster, ...customRegionData[10]];

  // Shuffling options within individual questions to add more micro-variety
  const shuffleOptionsInPool = (pool: any[]) => {
    return pool.map(item => {
      const origAnswer = item.answer;
      // Shuffle options but make sure the real answer is still in there
      const shuffledOpts = shuffleArray(item.options);
      // Guarantee the correct answer exists
      if (!shuffledOpts.includes(origAnswer)) {
        shuffledOpts[0] = origAnswer;
      }
      return {
        ...item,
        options: shuffleArray(shuffledOpts)
      };
    });
  };

  const processedEasy = shuffleOptionsInPool(easyPool);
  const processedMedium = shuffleOptionsInPool(mediumPool);
  const processedHeavy = shuffleOptionsInPool(heavyPool);
  const processedMaster = shuffleOptionsInPool(masterPool);

  // Slicing exactly 5 questions for each of the point tiers
  const pointsList: Array<{ points: 1 | 2 | 5 | 10; qList: any[] }> = [
    { points: 1, qList: shuffleArray(processedEasy).slice(0, 5) },
    { points: 2, qList: shuffleArray(processedMedium).slice(0, 5) },
    { points: 5, qList: shuffleArray(processedHeavy).slice(0, 5) },
    { points: 10, qList: shuffleArray(processedMaster).slice(0, 5) }
  ];

  pointsList.forEach(({ points, qList }) => {
    qList.forEach((q, idx) => {
      list.push({
        id: `${regionId}_${points}_${idx}`,
        points,
        question: q.question,
        options: q.options,
        answer: q.answer,
        category: q.category
      });
    });
  });

  return list;
};

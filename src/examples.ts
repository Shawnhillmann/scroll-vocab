export type Example = {
  pl: string
  en: string
}

const x = (pl: string, en: string): Example => ({ pl, en })

const EXAMPLES: Record<string, Example[]> = {
  spoon: [
    x('Jem zupę łyżką.', 'I eat soup with a spoon.'),
    x('Ta łyżka jest czysta.', 'This spoon is clean.'),
    x('Potrzebuję małej łyżki.', 'I need a small spoon.'),
  ],
  fork: [
    x('Jem makaron widelcem.', 'I eat pasta with a fork.'),
    x('Widelec leży na stole.', 'The fork is on the table.'),
    x('Podaj mi widelec.', 'Pass me a fork.'),
  ],
  knife: [
    x('Kroję chleb nożem.', 'I cut bread with a knife.'),
    x('Ten nóż jest ostry.', 'This knife is sharp.'),
    x('Nóż leży obok talerza.', 'The knife is next to the plate.'),
  ],
  plate: [
    x('Na talerzu jest sałatka.', 'There is salad on the plate.'),
    x('Myję talerz po obiedzie.', 'I wash the plate after lunch.'),
    x('Czysty talerz stoi tu.', 'A clean plate is here.'),
  ],
  bowl: [
    x('W misce jest zupa.', 'There is soup in the bowl.'),
    x('Napełniam miskę ryżem.', 'I fill the bowl with rice.'),
    x('Ta miska jest duża.', 'This bowl is big.'),
  ],
  pan: [
    x('Smażę jajko na patelni.', 'I fry an egg in the pan.'),
    x('Patelnia jest gorąca.', 'The pan is hot.'),
    x('Myję patelnię po jedzeniu.', 'I wash the pan after eating.'),
  ],
  glass: [
    x('Piję wodę ze szklanki.', 'I drink water from a glass.'),
    x('Szklanka jest pełna soku.', 'The glass is full of juice.'),
    x('Stawiam szklankę na stole.', 'I put the glass on the table.'),
  ],
  trash: [
    x('Wrzucam to do kosza.', 'I throw this in the trash can.'),
    x('Kosz jest pełny.', 'The trash can is full.'),
    x('Wynoszę kosz na zewnątrz.', 'I take the trash can outside.'),
  ],
  broom: [
    x('Zamiatam podłogę miotłą.', 'I sweep the floor with a broom.'),
    x('Miotła stoi w kącie.', 'The broom is in the corner.'),
    x('Potrzebuję nowej miotły.', 'I need a new broom.'),
  ],
  chair: [
    x('Siedzę na krześle.', 'I sit on the chair.'),
    x('To krzesło jest wygodne.', 'This chair is comfortable.'),
    x('Przysuń krzesło bliżej.', 'Pull the chair closer.'),
  ],
  sofa: [
    x('Leżę na kanapie.', 'I lie on the sofa.'),
    x('Kanapa jest bardzo miękka.', 'The sofa is very soft.'),
    x('Oglądam film na kanapie.', 'I watch a film on the sofa.'),
  ],
  bed: [
    x('Śpię w łóżku.', 'I sleep in the bed.'),
    x('Łóżko jest duże i wygodne.', 'The bed is big and comfortable.'),
    x('Ścielę łóżko rano.', 'I make the bed in the morning.'),
  ],
  lamp: [
    x('Włączam lampę wieczorem.', 'I turn on the lamp in the evening.'),
    x('Lampa stoi przy łóżku.', 'The lamp is next to the bed.'),
    x('Ta lampa daje dużo światła.', 'This lamp gives a lot of light.'),
  ],
  clock: [
    x('Zegar pokazuje godzinę.', 'The clock shows the time.'),
    x('Zegar wisi na ścianie.', 'The clock hangs on the wall.'),
    x('Słyszę głośny zegar.', 'I hear a loud clock.'),
  ],
  candle: [
    x('Zapalam świecę wieczorem.', 'I light a candle in the evening.'),
    x('Świeca pachnie ładnie.', 'The candle smells nice.'),
    x('Świeca stoi na stole.', 'The candle is on the table.'),
  ],
  houseplant: [
    x('Podlewam roślinę codziennie.', 'I water the plant every day.'),
    x('Roślina stoi przy oknie.', 'The plant is by the window.'),
    x('Ta roślina jest zielona.', 'This plant is green.'),
  ],
  television: [
    x('Oglądam wiadomości w telewizorze.', 'I watch the news on the television.'),
    x('Telewizor jest w salonie.', 'The television is in the living room.'),
    x('Wyłączam telewizor na noc.', 'I turn off the television at night.'),
  ],
  door: [
    x('Zamykam drzwi na klucz.', 'I lock the door.'),
    x('Otwórz drzwi, proszę.', 'Open the door, please.'),
    x('Drzwi są ciężkie.', 'The door is heavy.'),
  ],
  window: [
    x('Otwieram okno rano.', 'I open the window in the morning.'),
    x('Przez okno widzę drzewo.', 'I see a tree through the window.'),
    x('Okno jest czyste.', 'The window is clean.'),
  ],
  key: [
    x('Szukam klucza do domu.', 'I am looking for the house key.'),
    x('Klucz jest w torbie.', 'The key is in the bag.'),
    x('Bez klucza nie wejdę.', 'I cannot go in without the key.'),
  ],
  soap: [
    x('Myję ręce mydłem.', 'I wash my hands with soap.'),
    x('To mydło ładnie pachnie.', 'This soap smells nice.'),
    x('Mydło leży przy zlewie.', 'The soap is by the sink.'),
  ],
  book: [
    x('Czytam ciekawą książkę.', 'I am reading an interesting book.'),
    x('Książka leży na stole.', 'The book is on the table.'),
    x('Ta książka jest nowa.', 'This book is new.'),
  ],
  phone: [
    x('Dzwonię z telefonu.', 'I call from the phone.'),
    x('Mój telefon jest w kieszeni.', 'My phone is in my pocket.'),
    x('Ładuję telefon wieczorem.', 'I charge the phone in the evening.'),
  ],
  shower: [
    x('Biorę prysznic rano.', 'I take a shower in the morning.'),
    x('Woda w prysznicu jest ciepła.', 'The water in the shower is warm.'),
    x('Prysznic jest w łazience.', 'The shower is in the bathroom.'),
  ],
  toilet: [
    x('Toaleta jest na górze.', 'The toilet is upstairs.'),
    x('Muszę iść do toalety.', 'I need to go to the toilet.'),
    x('Toaleta jest czysta.', 'The toilet is clean.'),
  ],
  mirror: [
    x('Patrzę w lustro.', 'I look in the mirror.'),
    x('Lustro wisi w łazience.', 'The mirror hangs in the bathroom.'),
    x('W lustrze widzę twarz.', 'I see a face in the mirror.'),
  ],
  computer: [
    x('Pracuję przy komputerze.', 'I work at the computer.'),
    x('Komputer jest szybki.', 'The computer is fast.'),
    x('Wyłączam komputer na noc.', 'I turn off the computer at night.'),
  ],
  charger: [
    x('Ładowarka leży przy łóżku.', 'The charger is by the bed.'),
    x('Nie mogę znaleźć ładowarki.', 'I cannot find the charger.'),
    x('Podłączam ładowarkę do telefonu.', 'I plug the charger into the phone.'),
  ],
  mailbox: [
    x('Wrzuć list do skrzynki.', 'Put the letter in the mailbox.'),
    x('Skrzynka jest przy drzwiach.', 'The mailbox is by the door.'),
    x('Sprawdzam skrzynkę rano.', 'I check the mailbox in the morning.'),
  ],
  elevator: [
    x('Jadę windą na górę.', 'I take the elevator up.'),
    x('Winda jest pełna ludzi.', 'The elevator is full of people.'),
    x('Czekam na windę.', 'I am waiting for the elevator.'),
  ],
  apple: [
    x('Jem czerwone jabłko.', 'I eat a red apple.'),
    x('To jabłko jest słodkie.', 'This apple is sweet.'),
    x('Kupuję jabłka na targu.', 'I buy apples at the market.'),
  ],
  banana: [
    x('Banan jest żółty i słodki.', 'The banana is yellow and sweet.'),
    x('Jem banana na śniadanie.', 'I eat a banana for breakfast.'),
    x('Lubię dojrzałego banana.', 'I like a ripe banana.'),
  ],
  orange: [
    x('Pomarańcza jest soczysta.', 'The orange is juicy.'),
    x('Obieram pomarańczę.', 'I peel an orange.'),
    x('Piję sok z pomarańczy.', 'I drink orange juice.'),
  ],
  strawberry: [
    x('Truskawka jest czerwona.', 'The strawberry is red.'),
    x('Lubię słodkie truskawki.', 'I like sweet strawberries.'),
    x('Jem truskawki z lodami.', 'I eat strawberries with ice cream.'),
  ],
  grape: [
    x('Winogrono jest słodkie.', 'The grape is sweet.'),
    x('Jem zielone winogrona.', 'I eat green grapes.'),
    x('Te winogrona są kwaśne.', 'These grapes are sour.'),
  ],
  lemon: [
    x('Cytryna jest kwaśna.', 'The lemon is sour.'),
    x('Dodaję cytrynę do herbaty.', 'I add lemon to tea.'),
    x('Kroję cytrynę na plasterki.', 'I cut the lemon into slices.'),
  ],
  peach: [
    x('Brzoskwinia jest miękka.', 'The peach is soft.'),
    x('To dojrzała brzoskwinia.', 'This is a ripe peach.'),
    x('Lubię sok z brzoskwini.', 'I like peach juice.'),
  ],
  bread: [
    x('Kroję świeży chleb.', 'I slice fresh bread.'),
    x('Lubię chleb z masłem.', 'I like bread with butter.'),
    x('Chleb jest jeszcze ciepły.', 'The bread is still warm.'),
  ],
  cheese: [
    x('Ser jest żółty i słony.', 'The cheese is yellow and salty.'),
    x('Jem ser z chlebem.', 'I eat cheese with bread.'),
    x('Kupuję ser w sklepie.', 'I buy cheese at the shop.'),
  ],
  egg: [
    x('Gotuję jajko na śniadanie.', 'I boil an egg for breakfast.'),
    x('To jajko jest świeże.', 'This egg is fresh.'),
    x('Smażę jajko na patelni.', 'I fry an egg in the pan.'),
  ],
  meat: [
    x('Gotuję mięso na obiad.', 'I cook meat for dinner.'),
    x('To mięso jest świeże.', 'This meat is fresh.'),
    x('Nie jem dużo mięsa.', 'I do not eat much meat.'),
  ],
  rice: [
    x('Ryż jest biały i sypki.', 'The rice is white and fluffy.'),
    x('Jem ryż z kurczakiem.', 'I eat rice with chicken.'),
    x('Gotuję ryż w garnku.', 'I cook rice in a pot.'),
  ],
  pasta: [
    x('Lubię makaron z sosem.', 'I like pasta with sauce.'),
    x('Makaron jest jeszcze gorący.', 'The pasta is still hot.'),
    x('Gotuję makaron na obiad.', 'I cook pasta for dinner.'),
  ],
  soup: [
    x('Zupa jest ciepła i dobra.', 'The soup is warm and good.'),
    x('Jem zupę łyżką.', 'I eat soup with a spoon.'),
    x('Gotuję zupę na obiad.', 'I cook soup for dinner.'),
  ],
  salad: [
    x('Sałatka jest świeża.', 'The salad is fresh.'),
    x('Jem sałatkę na lunch.', 'I eat salad for lunch.'),
    x('W sałatce jest pomidor.', 'There is tomato in the salad.'),
  ],
  pizza: [
    x('Pizza jest gorąca i smaczna.', 'The pizza is hot and tasty.'),
    x('Zamawiam pizzę na wieczór.', 'I order pizza for the evening.'),
    x('Lubię pizzę z serem.', 'I like pizza with cheese.'),
  ],
  burger: [
    x('Hamburger jest duży.', 'The burger is big.'),
    x('Jem hamburgera z frytkami.', 'I eat a burger with fries.'),
    x('Ten hamburger jest smaczny.', 'This burger is tasty.'),
  ],
  sandwich: [
    x('Kanapka jest smaczna.', 'The sandwich is tasty.'),
    x('Jem kanapkę na śniadanie.', 'I eat a sandwich for breakfast.'),
    x('Robię kanapkę z serem.', 'I make a sandwich with cheese.'),
  ],
  'chicken-food': [
    x('Kurczak jest pieczony.', 'The chicken is roasted.'),
    x('Jem kurczaka z ryżem.', 'I eat chicken with rice.'),
    x('Lubię zupę z kurczakiem.', 'I like soup with chicken.'),
  ],
  potato: [
    x('Ziemniak jest miękki.', 'The potato is soft.'),
    x('Gotuję ziemniaki na obiad.', 'I cook potatoes for dinner.'),
    x('Lubię pieczone ziemniaki.', 'I like baked potatoes.'),
  ],
  carrot: [
    x('Marchewka jest pomarańczowa.', 'The carrot is orange.'),
    x('Jem surową marchewkę.', 'I eat a raw carrot.'),
    x('Kroję marchewkę do zupy.', 'I cut a carrot for the soup.'),
  ],
  butter: [
    x('Smaruję chleb masłem.', 'I spread butter on bread.'),
    x('Masło jest w lodówce.', 'The butter is in the fridge.'),
    x('To masło jest miękkie.', 'This butter is soft.'),
  ],
  tomato: [
    x('Pomidor jest czerwony.', 'The tomato is red.'),
    x('Kroję pomidor do sałatki.', 'I cut a tomato for the salad.'),
    x('Ten pomidor jest soczysty.', 'This tomato is juicy.'),
  ],
  mushroom: [
    x('Grzyb rośnie w lesie.', 'The mushroom grows in the forest.'),
    x('Dodaję grzyba do zupy.', 'I add a mushroom to the soup.'),
    x('Ten grzyb jest jadalny.', 'This mushroom is edible.'),
  ],
  corn: [
    x('Kukurydza jest żółta.', 'The corn is yellow.'),
    x('Jem kukurydzę z masłem.', 'I eat corn with butter.'),
    x('Lubię słodką kukurydzę.', 'I like sweet corn.'),
  ],
  honey: [
    x('Miód jest bardzo słodki.', 'Honey is very sweet.'),
    x('Dodaję miód do herbaty.', 'I add honey to tea.'),
    x('Lubię chleb z miodem.', 'I like bread with honey.'),
  ],
  salt: [
    x('Dodaję sól do zupy.', 'I add salt to the soup.'),
    x('Za dużo soli w jedzeniu.', 'There is too much salt in the food.'),
    x('Podaj mi sól, proszę.', 'Pass me the salt, please.'),
  ],
  water: [
    x('Piję zimną wodę.', 'I drink cold water.'),
    x('Woda jest czysta.', 'The water is clean.'),
    x('Nalewam wodę do szklanki.', 'I pour water into a glass.'),
  ],
  milk: [
    x('Piję mleko rano.', 'I drink milk in the morning.'),
    x('Mleko jest w lodówce.', 'The milk is in the fridge.'),
    x('Lubię ciepłe mleko.', 'I like warm milk.'),
  ],
  coffee: [
    x('Piję kawę rano.', 'I drink coffee in the morning.'),
    x('Ta kawa jest mocna.', 'This coffee is strong.'),
    x('Lubię kawę z mlekiem.', 'I like coffee with milk.'),
  ],
  tea: [
    x('Herbata jest gorąca.', 'The tea is hot.'),
    x('Piję herbatę wieczorem.', 'I drink tea in the evening.'),
    x('Lubię herbatę z cytryną.', 'I like tea with lemon.'),
  ],
  wine: [
    x('To czerwone wino.', 'This is red wine.'),
    x('Piję kieliszek wina.', 'I drink a glass of wine.'),
    x('Wino stoi na stole.', 'The wine is on the table.'),
  ],
  beer: [
    x('Piwo jest zimne.', 'The beer is cold.'),
    x('Piję piwo z przyjacielem.', 'I drink beer with a friend.'),
    x('To piwo jest gorzkie.', 'This beer is bitter.'),
  ],
  juice: [
    x('Sok jest słodki.', 'The juice is sweet.'),
    x('Piję sok pomarańczowy.', 'I drink orange juice.'),
    x('Nalewam sok do szklanki.', 'I pour juice into a glass.'),
  ],
  cake: [
    x('Ciasto jest słodkie.', 'The cake is sweet.'),
    x('Jem kawałek ciasta.', 'I eat a piece of cake.'),
    x('Pieczę ciasto na urodziny.', 'I bake a cake for a birthday.'),
  ],
  'ice-cream': [
    x('Lody są zimne i słodkie.', 'The ice cream is cold and sweet.'),
    x('Jem lody latem.', 'I eat ice cream in summer.'),
    x('Lubię czekoladowe lody.', 'I like chocolate ice cream.'),
  ],
  chocolate: [
    x('Czekolada jest słodka.', 'The chocolate is sweet.'),
    x('Jem kawałek czekolady.', 'I eat a piece of chocolate.'),
    x('Lubię gorzką czekoladę.', 'I like dark chocolate.'),
  ],
  cookie: [
    x('Ciastko jest chrupiące.', 'The cookie is crunchy.'),
    x('Jem ciastko z kawą.', 'I eat a cookie with coffee.'),
    x('Pieczę ciasteczka w domu.', 'I bake cookies at home.'),
  ],
  croissant: [
    x('Rogalik jest świeży.', 'The croissant is fresh.'),
    x('Jem rogalik na śniadanie.', 'I eat a croissant for breakfast.'),
    x('Lubię rogalik z masłem.', 'I like a croissant with butter.'),
  ],
  donut: [
    x('Pączek jest słodki.', 'The donut is sweet.'),
    x('Jem pączka z kawą.', 'I eat a donut with coffee.'),
    x('Ten pączek ma dżem.', 'This donut has jam.'),
  ],
  popcorn: [
    x('Jem popcorn w kinie.', 'I eat popcorn at the cinema.'),
    x('Popcorn jest słony.', 'The popcorn is salty.'),
    x('Lubię słodki popcorn.', 'I like sweet popcorn.'),
  ],
  cat: [
    x('Kot śpi na kanapie.', 'The cat is sleeping on the sofa.'),
    x('Mój kot jest czarny.', 'My cat is black.'),
    x('Kot pije mleko.', 'The cat drinks milk.'),
  ],
  dog: [
    x('Pies biega w parku.', 'The dog runs in the park.'),
    x('Mój pies jest duży.', 'My dog is big.'),
    x('Pies lubi spacer.', 'The dog likes a walk.'),
  ],
  bird: [
    x('Ptak śpiewa rano.', 'The bird sings in the morning.'),
    x('Ptak siedzi na drzewie.', 'The bird sits on a tree.'),
    x('Widzę małego ptaka.', 'I see a small bird.'),
  ],
  fish: [
    x('Ryba pływa w wodzie.', 'The fish swims in the water.'),
    x('Widzę rybę w rzece.', 'I see a fish in the river.'),
    x('Ta ryba jest srebrna.', 'This fish is silver.'),
  ],
  horse: [
    x('Koń biegnie po polu.', 'The horse runs across the field.'),
    x('Ten koń jest szybki.', 'This horse is fast.'),
    x('Lubię jeździć konno.', 'I like to ride a horse.'),
  ],
  cow: [
    x('Krowa je trawę.', 'The cow eats grass.'),
    x('Krowa daje mleko.', 'The cow gives milk.'),
    x('Widzę krowę na polu.', 'I see a cow in the field.'),
  ],
  pig: [
    x('Świnia jest na farmie.', 'The pig is on the farm.'),
    x('Mała świnia jest różowa.', 'The small pig is pink.'),
    x('Świnia je z miski.', 'The pig eats from a bowl.'),
  ],
  sheep: [
    x('Owca ma białą wełnę.', 'The sheep has white wool.'),
    x('Owca je trawę.', 'The sheep eats grass.'),
    x('Widzę owcę na łące.', 'I see a sheep in the meadow.'),
  ],
  chicken: [
    x('Kura znosi jajka.', 'The chicken lays eggs.'),
    x('Kura jest na podwórku.', 'The chicken is in the yard.'),
    x('Słyszę głośną kurę.', 'I hear a loud chicken.'),
  ],
  rabbit: [
    x('Królik je marchewkę.', 'The rabbit eats a carrot.'),
    x('Królik jest szybki.', 'The rabbit is fast.'),
    x('Mały królik jest biały.', 'The little rabbit is white.'),
  ],
  mouse: [
    x('Mysz jest bardzo mała.', 'The mouse is very small.'),
    x('Mysz biega po kuchni.', 'The mouse runs in the kitchen.'),
    x('Widzę mysz pod stołem.', 'I see a mouse under the table.'),
  ],
  duck: [
    x('Kaczka pływa w stawie.', 'The duck swims in the pond.'),
    x('Kaczka jest żółta.', 'The duck is yellow.'),
    x('Słyszę kaczkę przy wodzie.', 'I hear a duck by the water.'),
  ],
  goat: [
    x('Koza je trawę.', 'The goat eats grass.'),
    x('Koza jest na górze.', 'The goat is on the mountain.'),
    x('Ta koza jest biała.', 'This goat is white.'),
  ],
  donkey: [
    x('Osioł idzie powoli.', 'The donkey walks slowly.'),
    x('Osioł jest na farmie.', 'The donkey is on the farm.'),
    x('Widzę osła na drodze.', 'I see a donkey on the road.'),
  ],
  bear: [
    x('Niedźwiedź mieszka w lesie.', 'The bear lives in the forest.'),
    x('Niedźwiedź jest duży i silny.', 'The bear is big and strong.'),
    x('Widzę niedźwiedzia w zoo.', 'I see a bear at the zoo.'),
  ],
  lion: [
    x('Lew jest królem zwierząt.', 'The lion is the king of animals.'),
    x('Lew ma grzywę.', 'The lion has a mane.'),
    x('Słyszę ryk lwa.', 'I hear a lion roar.'),
  ],
  elephant: [
    x('Słoń jest bardzo duży.', 'The elephant is very big.'),
    x('Słoń ma długą trąbę.', 'The elephant has a long trunk.'),
    x('Widzę słonia w zoo.', 'I see an elephant at the zoo.'),
  ],
  snake: [
    x('Wąż pełza po trawie.', 'The snake crawls on the grass.'),
    x('Ten wąż jest długi.', 'This snake is long.'),
    x('Boję się węża.', 'I am afraid of the snake.'),
  ],
  turtle: [
    x('Żółw idzie bardzo wolno.', 'The turtle walks very slowly.'),
    x('Żółw ma twardy pancerz.', 'The turtle has a hard shell.'),
    x('Żółw siedzi przy wodzie.', 'The turtle sits by the water.'),
  ],
  wolf: [
    x('Wilk mieszka w lesie.', 'The wolf lives in the forest.'),
    x('Wilk wyje w nocy.', 'The wolf howls at night.'),
    x('Widzę wilka z daleka.', 'I see a wolf from far away.'),
  ],
  fox: [
    x('Lis jest rudy i szybki.', 'The fox is red and fast.'),
    x('Lis biegnie przez las.', 'The fox runs through the forest.'),
    x('Widzę lisa wieczorem.', 'I see a fox in the evening.'),
  ],
  deer: [
    x('Jeleń stoi w lesie.', 'The deer stands in the forest.'),
    x('Jeleń ma piękne poroże.', 'The deer has beautiful antlers.'),
    x('Widzę jelenia rano.', 'I see a deer in the morning.'),
  ],
  tiger: [
    x('Tygrys ma paski.', 'The tiger has stripes.'),
    x('Tygrys jest silny.', 'The tiger is strong.'),
    x('Widzę tygrysa w zoo.', 'I see a tiger at the zoo.'),
  ],
  monkey: [
    x('Małpa skacze po drzewie.', 'The monkey jumps in the tree.'),
    x('Małpa je banana.', 'The monkey eats a banana.'),
    x('Śmieszna małpa bawi się.', 'The funny monkey is playing.'),
  ],
  panda: [
    x('Panda je bambus.', 'The panda eats bamboo.'),
    x('Panda jest czarno-biała.', 'The panda is black and white.'),
    x('Widzę pandę w zoo.', 'I see a panda at the zoo.'),
  ],
  zebra: [
    x('Zebra ma czarne paski.', 'The zebra has black stripes.'),
    x('Zebra biegnie po polu.', 'The zebra runs across the field.'),
    x('Widzę zebrę z daleka.', 'I see a zebra from far away.'),
  ],
  giraffe: [
    x('Żyrafa ma długą szyję.', 'The giraffe has a long neck.'),
    x('Żyrafa je liście z drzewa.', 'The giraffe eats leaves from a tree.'),
    x('Żyrafa jest bardzo wysoka.', 'The giraffe is very tall.'),
  ],
  kangaroo: [
    x('Kangur skacze daleko.', 'The kangaroo jumps far.'),
    x('Kangur ma torbę na brzuchu.', 'The kangaroo has a pouch.'),
    x('Widzę kangura w zoo.', 'I see a kangaroo at the zoo.'),
  ],
  squirrel: [
    x('Wiewiórka je orzechy.', 'The squirrel eats nuts.'),
    x('Wiewiórka skacze po drzewie.', 'The squirrel jumps in the tree.'),
    x('Mała wiewiórka jest szybka.', 'The little squirrel is fast.'),
  ],
  crocodile: [
    x('Krokodyl leży przy wodzie.', 'The crocodile lies by the water.'),
    x('Krokodyl ma ostre zęby.', 'The crocodile has sharp teeth.'),
    x('Boję się krokodyla.', 'I am afraid of the crocodile.'),
  ],
  camel: [
    x('Wielbłąd idzie przez pustynię.', 'The camel walks across the desert.'),
    x('Wielbłąd ma dwa garby.', 'The camel has two humps.'),
    x('Widzę wielbłąda z daleka.', 'I see a camel from far away.'),
  ],
  frog: [
    x('Żaba skacze do wody.', 'The frog jumps into the water.'),
    x('Żaba jest zielona.', 'The frog is green.'),
    x('Słyszę żabę wieczorem.', 'I hear a frog in the evening.'),
  ],
  penguin: [
    x('Pingwin chodzi po lodzie.', 'The penguin walks on the ice.'),
    x('Pingwin pływa bardzo dobrze.', 'The penguin swims very well.'),
    x('Pingwin jest czarno-biały.', 'The penguin is black and white.'),
  ],
  whale: [
    x('Wieloryb pływa w morzu.', 'The whale swims in the sea.'),
    x('Wieloryb jest ogromny.', 'The whale is huge.'),
    x('Widzę wieloryba z łodzi.', 'I see a whale from the boat.'),
  ],
  dolphin: [
    x('Delfin skacze z wody.', 'The dolphin jumps out of the water.'),
    x('Delfin jest bardzo mądry.', 'The dolphin is very smart.'),
    x('Widzę delfina w morzu.', 'I see a dolphin in the sea.'),
  ],
  shark: [
    x('Rekin pływa w oceanie.', 'The shark swims in the ocean.'),
    x('Rekin ma ostre zęby.', 'The shark has sharp teeth.'),
    x('Boję się rekina.', 'I am afraid of the shark.'),
  ],
  crab: [
    x('Krab chodzi bokiem.', 'The crab walks sideways.'),
    x('Krab jest na plaży.', 'The crab is on the beach.'),
    x('Ten krab jest czerwony.', 'This crab is red.'),
  ],
  octopus: [
    x('Ośmiornica ma osiem ramion.', 'The octopus has eight arms.'),
    x('Ośmiornica mieszka w morzu.', 'The octopus lives in the sea.'),
    x('Widzę ośmiornicę w wodzie.', 'I see an octopus in the water.'),
  ],
  seal: [
    x('Foka leży na lodzie.', 'The seal lies on the ice.'),
    x('Foka pływa szybko.', 'The seal swims fast.'),
    x('Foka jest bardzo słodka.', 'The seal is very cute.'),
  ],
  swan: [
    x('Łabędź pływa po jeziorze.', 'The swan swims on the lake.'),
    x('Łabędź jest biały i duży.', 'The swan is white and big.'),
    x('Widzę łabędzia z mostu.', 'I see a swan from the bridge.'),
  ],
  bee: [
    x('Pszczoła robi miód.', 'The bee makes honey.'),
    x('Pszczoła lata nad kwiatem.', 'The bee flies over the flower.'),
    x('Słyszę pszczołę w ogrodzie.', 'I hear a bee in the garden.'),
  ],
  butterfly: [
    x('Motyl jest kolorowy.', 'The butterfly is colorful.'),
    x('Motyl siada na kwiecie.', 'The butterfly lands on the flower.'),
    x('Widzę motyla latem.', 'I see a butterfly in summer.'),
  ],
  spider: [
    x('Pająk robi sieć.', 'The spider makes a web.'),
    x('Pająk siedzi w kącie.', 'The spider sits in the corner.'),
    x('Boję się pająka.', 'I am afraid of the spider.'),
  ],
  ant: [
    x('Mrówka niesie jedzenie.', 'The ant carries food.'),
    x('Mrówka jest bardzo mała.', 'The ant is very small.'),
    x('Widzę mrówkę na ziemi.', 'I see an ant on the ground.'),
  ],
  owl: [
    x('Sowa lata w nocy.', 'The owl flies at night.'),
    x('Sowa siedzi na drzewie.', 'The owl sits in the tree.'),
    x('Sowa ma duże oczy.', 'The owl has big eyes.'),
  ],
  car: [
    x('Samochód stoi na ulicy.', 'The car is on the street.'),
    x('Jadę samochodem do pracy.', 'I drive a car to work.'),
    x('Ten samochód jest czerwony.', 'This car is red.'),
  ],
  bus: [
    x('Autobus jedzie do miasta.', 'The bus goes to the city.'),
    x('Czekam na autobus.', 'I am waiting for the bus.'),
    x('Wsiadłem do autobusu.', 'I got on the bus.'),
  ],
  train: [
    x('Pociąg jedzie na dworzec.', 'The train goes to the station.'),
    x('Pociąg jest punktualny.', 'The train is on time.'),
    x('Lubię jechać pociągiem.', 'I like to travel by train.'),
  ],
  bicycle: [
    x('Jeżdżę rowerem do parku.', 'I ride a bicycle to the park.'),
    x('Mój rower jest niebieski.', 'My bicycle is blue.'),
    x('Rower stoi przy domu.', 'The bicycle is by the house.'),
  ],
  taxi: [
    x('Zamawiam taksówkę na lotnisko.', 'I order a taxi to the airport.'),
    x('Taksówka czeka przed hotelem.', 'The taxi waits in front of the hotel.'),
    x('Jadę taksówką do centrum.', 'I take a taxi downtown.'),
  ],
  airplane: [
    x('Samolot leci do Warszawy.', 'The airplane flies to Warsaw.'),
    x('Samolot startuje rano.', 'The airplane takes off in the morning.'),
    x('Lubię podróżować samolotem.', 'I like to travel by airplane.'),
  ],
  boat: [
    x('Łódź pływa po jeziorze.', 'The boat floats on the lake.'),
    x('Wsiadam do łodzi.', 'I get into the boat.'),
    x('Łódź jest mała i biała.', 'The boat is small and white.'),
  ],
  metro: [
    x('Jadę metrem do pracy.', 'I take the metro to work.'),
    x('Metro jest szybkie.', 'The metro is fast.'),
    x('Czekam na metro.', 'I am waiting for the metro.'),
  ],
  motorcycle: [
    x('Motocykl jest bardzo szybki.', 'The motorcycle is very fast.'),
    x('Jeżdżę motocyklem latem.', 'I ride a motorcycle in summer.'),
    x('Motocykl stoi przy drodze.', 'The motorcycle is by the road.'),
  ],
  tram: [
    x('Tramwaj jedzie przez miasto.', 'The tram goes through the city.'),
    x('Czekam na tramwaj.', 'I am waiting for the tram.'),
    x('Wsiadłem do tramwaju.', 'I got on the tram.'),
  ],
  truck: [
    x('Ciężarówka wiezie jedzenie.', 'The truck carries food.'),
    x('Ciężarówka jest duża.', 'The truck is big.'),
    x('Ciężarówka jedzie powoli.', 'The truck drives slowly.'),
  ],
  'traffic-light': [
    x('Światła są czerwone.', 'The traffic light is red.'),
    x('Czekam na zielone światła.', 'I wait for the green light.'),
    x('Światła stoją na skrzyżowaniu.', 'The traffic light is at the crossing.'),
  ],
  road: [
    x('Droga jest długa i prosta.', 'The road is long and straight.'),
    x('Samochód jedzie drogą.', 'The car drives on the road.'),
    x('Ta droga prowadzi do miasta.', 'This road leads to the city.'),
  ],
  parking: [
    x('Szukam parkingu w mieście.', 'I am looking for parking in the city.'),
    x('Parking jest pełny.', 'The parking lot is full.'),
    x('Zostawiam auto na parkingu.', 'I leave the car in the parking lot.'),
  ],
  shop: [
    x('Kupuję chleb w sklepie.', 'I buy bread at the shop.'),
    x('Sklep jest otwarty.', 'The shop is open.'),
    x('Idę do sklepu po mleko.', 'I go to the shop for milk.'),
  ],
  school: [
    x('Dzieci idą do szkoły.', 'The children go to school.'),
    x('Szkoła zaczyna się rano.', 'School starts in the morning.'),
    x('Moja szkoła jest blisko.', 'My school is nearby.'),
  ],
  hospital: [
    x('Lekarz pracuje w szpitalu.', 'The doctor works in the hospital.'),
    x('Szpital jest duży.', 'The hospital is big.'),
    x('Idę do szpitala na wizytę.', 'I go to the hospital for an appointment.'),
  ],
  library: [
    x('Czytam książki w bibliotece.', 'I read books in the library.'),
    x('Biblioteka jest cicha.', 'The library is quiet.'),
    x('Wypożyczam książkę z biblioteki.', 'I borrow a book from the library.'),
  ],
  bank: [
    x('Idę do banku po pieniądze.', 'I go to the bank for money.'),
    x('Bank jest w centrum.', 'The bank is downtown.'),
    x('Bank otwiera się rano.', 'The bank opens in the morning.'),
  ],
  church: [
    x('Kościół stoi na rynku.', 'The church stands in the square.'),
    x('Idę do kościoła w niedzielę.', 'I go to church on Sunday.'),
    x('Kościół jest stary i duży.', 'The church is old and big.'),
  ],
  museum: [
    x('Oglądam obrazy w muzeum.', 'I look at paintings in the museum.'),
    x('Muzeum jest ciekawe.', 'The museum is interesting.'),
    x('Muzeum otwiera się o dziesiątej.', 'The museum opens at ten.'),
  ],
  office: [
    x('Pracuję w biurze.', 'I work in an office.'),
    x('Biuro jest na piątym piętrze.', 'The office is on the fifth floor.'),
    x('W biurze jest komputer.', 'There is a computer in the office.'),
  ],
  factory: [
    x('Fabryka robi samochody.', 'The factory makes cars.'),
    x('Fabryka jest za miastem.', 'The factory is outside the city.'),
    x('Ludzie pracują w fabryce.', 'People work in the factory.'),
  ],
  stadium: [
    x('Mecz jest na stadionie.', 'The match is at the stadium.'),
    x('Stadion jest pełny ludzi.', 'The stadium is full of people.'),
    x('Idę na stadion wieczorem.', 'I go to the stadium in the evening.'),
  ],
  market: [
    x('Kupuję warzywa na targu.', 'I buy vegetables at the market.'),
    x('Targ jest głośny i żywy.', 'The market is loud and lively.'),
    x('Lubię chodzić na targ.', 'I like going to the market.'),
  ],
  'post-office': [
    x('Wysyłam list na poczcie.', 'I send a letter at the post office.'),
    x('Poczta jest blisko domu.', 'The post office is near home.'),
    x('Stoję w kolejce na poczcie.', 'I stand in line at the post office.'),
  ],
  pharmacy: [
    x('Kupuję lek w aptece.', 'I buy medicine at the pharmacy.'),
    x('Apteka jest otwarta długo.', 'The pharmacy is open late.'),
    x('Idę do apteki po plaster.', 'I go to the pharmacy for a bandage.'),
  ],
  hotel: [
    x('Śpię w hotelu.', 'I sleep in a hotel.'),
    x('Hotel jest blisko dworca.', 'The hotel is near the station.'),
    x('Hotel ma czyste pokoje.', 'The hotel has clean rooms.'),
  ],
  'gas-station': [
    x('Tankuję na stacji.', 'I get gas at the station.'),
    x('Stacja jest przy drodze.', 'The station is by the road.'),
    x('Na stacji kupuję kawę.', 'I buy coffee at the station.'),
  ],
  map: [
    x('Patrzę na mapę miasta.', 'I look at a map of the city.'),
    x('Mapa pokazuje drogę.', 'The map shows the road.'),
    x('Mam mapę w telefonie.', 'I have a map on my phone.'),
  ],
  station: [
    x('Czekam na pociąg na dworcu.', 'I wait for the train at the station.'),
    x('Dworzec jest duży.', 'The station is big.'),
    x('Idę na dworzec rano.', 'I go to the station in the morning.'),
  ],
  ticket: [
    x('Kupuję bilet na pociąg.', 'I buy a ticket for the train.'),
    x('Bilet jest w kieszeni.', 'The ticket is in my pocket.'),
    x('Pokaż bilet, proszę.', 'Show the ticket, please.'),
  ],
  suitcase: [
    x('Pakuję walizkę na wyjazd.', 'I pack a suitcase for the trip.'),
    x('Walizka jest ciężka.', 'The suitcase is heavy.'),
    x('Walizka stoi przy drzwiach.', 'The suitcase is by the door.'),
  ],
  airport: [
    x('Samolot startuje z lotniska.', 'The plane takes off from the airport.'),
    x('Lotnisko jest daleko od miasta.', 'The airport is far from the city.'),
    x('Czekam na lotnisku.', 'I wait at the airport.'),
  ],
  fountain: [
    x('Fontanna stoi na placu.', 'The fountain is in the square.'),
    x('Dzieci bawią się przy fontannie.', 'Children play by the fountain.'),
    x('Woda w fontannie jest zimna.', 'The water in the fountain is cold.'),
  ],
  stop: [
    x('Zatrzymaj się na stop.', 'Stop at the stop sign.'),
    x('Znak stop jest czerwony.', 'The stop sign is red.'),
    x('Widzę stop na skrzyżowaniu.', 'I see a stop at the crossing.'),
  ],
  bridge: [
    x('Most jest nad rzeką.', 'The bridge is over the river.'),
    x('Idę przez most.', 'I walk across the bridge.'),
    x('Ten most jest stary.', 'This bridge is old.'),
  ],
  man: [
    x('Ten mężczyzna czyta książkę.', 'This man is reading a book.'),
    x('Mężczyzna czeka na autobus.', 'The man is waiting for the bus.'),
    x('Widzę mężczyznę w parku.', 'I see a man in the park.'),
  ],
  woman: [
    x('Ta kobieta pije kawę.', 'This woman is drinking coffee.'),
    x('Kobieta idzie do sklepu.', 'The woman is going to the shop.'),
    x('Widzę kobietę na ulicy.', 'I see a woman on the street.'),
  ],
  boy: [
    x('Chłopiec bawi się piłką.', 'The boy is playing with a ball.'),
    x('Chłopiec idzie do szkoły.', 'The boy is going to school.'),
    x('Ten chłopiec jest mały.', 'This boy is small.'),
  ],
  girl: [
    x('Dziewczynka czyta książkę.', 'The girl is reading a book.'),
    x('Dziewczynka uśmiecha się.', 'The girl is smiling.'),
    x('Ta dziewczynka jest miła.', 'This girl is kind.'),
  ],
  baby: [
    x('Niemowlę śpi w łóżeczku.', 'The baby is sleeping in the crib.'),
    x('Niemowlę płacze.', 'The baby is crying.'),
    x('Trzymam niemowlę na rękach.', 'I hold the baby in my arms.'),
  ],
  child: [
    x('Dziecko bawi się w parku.', 'The child plays in the park.'),
    x('Dziecko idzie z mamą.', 'The child walks with mom.'),
    x('To dziecko jest wesołe.', 'This child is happy.'),
  ],
  grandmother: [
    x('Babcia piecze ciasto.', 'Grandmother is baking a cake.'),
    x('Idę do babci na obiad.', 'I go to grandmother for dinner.'),
    x('Babcia opowiada historię.', 'Grandmother tells a story.'),
  ],
  grandfather: [
    x('Dziadek czyta gazetę.', 'Grandfather is reading a newspaper.'),
    x('Dziadek spaceruje w parku.', 'Grandfather walks in the park.'),
    x('Lubię rozmawiać z dziadkiem.', 'I like talking with grandfather.'),
  ],
  family: [
    x('Moja rodzina je obiad.', 'My family is eating dinner.'),
    x('Rodzina mieszka w domu.', 'The family lives in a house.'),
    x('Lubię czas z rodziną.', 'I like time with family.'),
  ],
  husband: [
    x('Mój mąż gotuje obiad.', 'My husband is cooking dinner.'),
    x('Mąż wraca z pracy.', 'The husband comes back from work.'),
    x('Rozmawiam z mężem.', 'I talk with my husband.'),
  ],
  wife: [
    x('Moja żona czyta książkę.', 'My wife is reading a book.'),
    x('Żona idzie do sklepu.', 'The wife goes to the shop.'),
    x('Rozmawiam z żoną.', 'I talk with my wife.'),
  ],
  friend: [
    x('Mój przyjaciel jest miły.', 'My friend is kind.'),
    x('Idę do kina z przyjacielem.', 'I go to the cinema with a friend.'),
    x('Dzwonię do przyjaciela.', 'I call a friend.'),
  ],
  student: [
    x('Uczeń czyta w klasie.', 'The student reads in class.'),
    x('Uczeń idzie do szkoły.', 'The student goes to school.'),
    x('Ten uczeń uczy się polskiego.', 'This student is learning Polish.'),
  ],
  police: [
    x('Policjant stoi na ulicy.', 'The police officer stands on the street.'),
    x('Policjant pomaga ludziom.', 'The police officer helps people.'),
    x('Widzę policjanta przy aucie.', 'I see a police officer by the car.'),
  ],
  doctor: [
    x('Lekarz bada pacjenta.', 'The doctor examines the patient.'),
    x('Idę do lekarza rano.', 'I go to the doctor in the morning.'),
    x('Lekarz pracuje w szpitalu.', 'The doctor works in the hospital.'),
  ],
  farmer: [
    x('Rolnik pracuje na polu.', 'The farmer works in the field.'),
    x('Rolnik ma krowy i owce.', 'The farmer has cows and sheep.'),
    x('Rolnik wstaje wcześnie.', 'The farmer gets up early.'),
  ],
  singer: [
    x('Piosenkarz śpiewa na scenie.', 'The singer sings on stage.'),
    x('Lubię tego piosenkarza.', 'I like this singer.'),
    x('Piosenkarz ma dobry głos.', 'The singer has a good voice.'),
  ],
  artist: [
    x('Artysta maluje obraz.', 'The artist paints a picture.'),
    x('Artysta pracuje w pracowni.', 'The artist works in a studio.'),
    x('Ten artysta jest znany.', 'This artist is famous.'),
  ],
  firefighter: [
    x('Strażak gasi ogień.', 'The firefighter puts out the fire.'),
    x('Strażak jest odważny.', 'The firefighter is brave.'),
    x('Widzę strażaka przy wozie.', 'I see a firefighter by the truck.'),
  ],
  soldier: [
    x('Żołnierz stoi na warcie.', 'The soldier stands on watch.'),
    x('Żołnierz nosi mundur.', 'The soldier wears a uniform.'),
    x('Żołnierz wraca do domu.', 'The soldier comes home.'),
  ],
  mechanic: [
    x('Mechanik naprawia auto.', 'The mechanic repairs the car.'),
    x('Mechanik pracuje w warsztacie.', 'The mechanic works in a garage.'),
    x('Idę do mechanika rano.', 'I go to the mechanic in the morning.'),
  ],
  photographer: [
    x('Fotograf robi zdjęcie.', 'The photographer takes a photo.'),
    x('Fotograf ma aparat.', 'The photographer has a camera.'),
    x('Ten fotograf jest dobry.', 'This photographer is good.'),
  ],
  journalist: [
    x('Dziennikarz pisze artykuł.', 'The journalist writes an article.'),
    x('Dziennikarz zadaje pytania.', 'The journalist asks questions.'),
    x('Widzę dziennikarza w telewizji.', 'I see a journalist on television.'),
  ],
  lawyer: [
    x('Prawnik pomaga w sądzie.', 'The lawyer helps in court.'),
    x('Prawnik czyta dokumenty.', 'The lawyer reads documents.'),
    x('Rozmawiam z prawnikiem.', 'I talk with a lawyer.'),
  ],
  head: [
    x('Boli mnie głowa.', 'My head hurts.'),
    x('Kładę czapkę na głowę.', 'I put a hat on my head.'),
    x('Kręcę głową.', 'I shake my head.'),
  ],
  eye: [
    x('Mam niebieskie oko.', 'I have a blue eye.'),
    x('Zamykam oko.', 'I close my eye.'),
    x('Coś wpadło mi do oka.', 'Something got in my eye.'),
  ],
  ear: [
    x('Słyszę muzykę uchem.', 'I hear music with my ear.'),
    x('Boli mnie ucho.', 'My ear hurts.'),
    x('Przyłóż telefon do ucha.', 'Hold the phone to your ear.'),
  ],
  nose: [
    x('Nos jest zimny.', 'The nose is cold.'),
    x('Zimno mi w nos.', 'My nose is cold.'),
    x('Czuję zapach nosem.', 'I smell with my nose.'),
  ],
  mouth: [
    x('Otwieram usta.', 'I open my mouth.'),
    x('Jem jedzenie ustami.', 'I eat food with my mouth.'),
    x('Uśmiecham się ustami.', 'I smile with my mouth.'),
  ],
  tooth: [
    x('Boli mnie ząb.', 'My tooth hurts.'),
    x('Myję ząb rano.', 'I brush my tooth in the morning.'),
    x('Lekarz ogląda ząb.', 'The doctor looks at the tooth.'),
  ],
  face: [
    x('Myję twarz rano.', 'I wash my face in the morning.'),
    x('On ma miłą twarz.', 'He has a kind face.'),
    x('Uśmiech rozjaśnia twarz.', 'A smile lights up the face.'),
  ],
  tongue: [
    x('Pokazuję język.', 'I stick out my tongue.'),
    x('Język jest różowy.', 'The tongue is pink.'),
    x('Czuję smak językiem.', 'I taste with my tongue.'),
  ],
  smile: [
    x('Ma szeroki uśmiech.', 'He has a wide smile.'),
    x('Twój uśmiech jest miły.', 'Your smile is kind.'),
    x('Uśmiech czyni dzień lepszym.', 'A smile makes the day better.'),
  ],
  finger: [
    x('Boli mnie palec.', 'My finger hurts.'),
    x('Pokazuję palcem drogę.', 'I point the way with my finger.'),
    x('Na palcu mam pierścionek.', 'I have a ring on my finger.'),
  ],
  hand: [
    x('Podaję rękę.', 'I give my hand.'),
    x('Myję rękę mydłem.', 'I wash my hand with soap.'),
    x('W ręce trzymam klucz.', 'I hold a key in my hand.'),
  ],
  foot: [
    x('Boli mnie stopa.', 'My foot hurts.'),
    x('Stawiam stopę na ziemi.', 'I put my foot on the ground.'),
    x('W bucie jest stopa.', 'There is a foot in the shoe.'),
  ],
  arm: [
    x('Podnoszę ramię.', 'I lift my arm.'),
    x('Boli mnie ramię.', 'My arm hurts.'),
    x('Trzymam torbę na ramieniu.', 'I hold a bag on my arm.'),
  ],
  leg: [
    x('Boli mnie noga.', 'My leg hurts.'),
    x('Biegam na jednej nodze.', 'I run on one leg.'),
    x('Noga jest zmęczona.', 'The leg is tired.'),
  ],
  heart: [
    x('Serce bije szybko.', 'The heart beats fast.'),
    x('Czuję serce w piersi.', 'I feel my heart in my chest.'),
    x('Ma dobre serce.', 'He has a good heart.'),
  ],
  brain: [
    x('Mózg pomaga myśleć.', 'The brain helps you think.'),
    x('Uczę się i trenuję mózg.', 'I study and train my brain.'),
    x('Mózg potrzebuje snu.', 'The brain needs sleep.'),
  ],
  bone: [
    x('Kość jest twarda.', 'The bone is hard.'),
    x('Pies gryzie kość.', 'The dog chews a bone.'),
    x('Boli mnie kość w nodze.', 'The bone in my leg hurts.'),
  ],
  blood: [
    x('Krew jest czerwona.', 'Blood is red.'),
    x('Lekarz bada krew.', 'The doctor tests the blood.'),
    x('Mam krew na palcu.', 'I have blood on my finger.'),
  ],
  lungs: [
    x('Płuca pomagają oddychać.', 'The lungs help you breathe.'),
    x('Biorę głęboki oddech płucami.', 'I take a deep breath with my lungs.'),
    x('Lekarz słucha płuc.', 'The doctor listens to the lungs.'),
  ],
  medicine: [
    x('Biorę lek rano.', 'I take medicine in the morning.'),
    x('Ten lek pomaga na kaszel.', 'This medicine helps with a cough.'),
    x('Lek jest w aptece.', 'The medicine is at the pharmacy.'),
  ],
  bandage: [
    x('Kładę plaster na palec.', 'I put a bandage on my finger.'),
    x('Potrzebuję plastra.', 'I need a bandage.'),
    x('Plaster jest w apteczce.', 'The bandage is in the first-aid kit.'),
  ],
  thermometer: [
    x('Mierzę temperaturę termometrem.', 'I measure the temperature with a thermometer.'),
    x('Termometr pokazuje gorączkę.', 'The thermometer shows a fever.'),
    x('Termometr jest w apteczce.', 'The thermometer is in the first-aid kit.'),
  ],
  ambulance: [
    x('Karetka jedzie szybko.', 'The ambulance drives fast.'),
    x('Słyszę karetkę na ulicy.', 'I hear an ambulance on the street.'),
    x('Karetka jedzie do szpitala.', 'The ambulance goes to the hospital.'),
  ],
  mask: [
    x('Noszę maseczkę w aptece.', 'I wear a mask at the pharmacy.'),
    x('Maseczka chroni twarz.', 'The mask protects the face.'),
    x('Zakładam maseczkę.', 'I put on a mask.'),
  ],
  vaccine: [
    x('Dostaję szczepionkę u lekarza.', 'I get a vaccine at the doctor.'),
    x('Szczepionka chroni zdrowie.', 'The vaccine protects health.'),
    x('Szczepionka jest w ramieniu.', 'The vaccine is in the arm.'),
  ],
  fever: [
    x('Mam gorączkę.', 'I have a fever.'),
    x('Gorączka jest wysoka.', 'The fever is high.'),
    x('Leżę w łóżku z gorączką.', 'I lie in bed with a fever.'),
  ],
  cough: [
    x('Mam silny kaszel.', 'I have a strong cough.'),
    x('Kaszel boli w piersi.', 'The cough hurts in the chest.'),
    x('Lek pomaga na kaszel.', 'The medicine helps the cough.'),
  ],
  pain: [
    x('Czuję ból w nodze.', 'I feel pain in my leg.'),
    x('Ból jest silny.', 'The pain is strong.'),
    x('Lek zmniejsza ból.', 'The medicine lessens the pain.'),
  ],
  sick: [
    x('Jestem chory i leżę.', 'I am sick and lying down.'),
    x('Chory człowiek potrzebuje snu.', 'A sick person needs sleep.'),
    x('Czuję się chory.', 'I feel sick.'),
  ],
  injury: [
    x('Mam ranę na ręce.', 'I have an injury on my hand.'),
    x('Rana trochę boli.', 'The injury hurts a little.'),
    x('Kładę plaster na ranę.', 'I put a bandage on the injury.'),
  ],
  shirt: [
    x('Ubieram czystą koszulę.', 'I put on a clean shirt.'),
    x('Ta koszula jest biała.', 'This shirt is white.'),
    x('Koszula leży na krześle.', 'The shirt is on the chair.'),
  ],
  pants: [
    x('Ubieram niebieskie spodnie.', 'I put on blue pants.'),
    x('Te spodnie są za długie.', 'These pants are too long.'),
    x('Spodnie leżą na łóżku.', 'The pants are on the bed.'),
  ],
  dress: [
    x('Ona ma ładną sukienkę.', 'She has a nice dress.'),
    x('Sukienka jest czerwona.', 'The dress is red.'),
    x('Ubiera sukienkę na imprezę.', 'She puts on a dress for the party.'),
  ],
  coat: [
    x('Ubieram płaszcz, bo zimno.', 'I put on a coat because it is cold.'),
    x('Płaszcz wisi przy drzwiach.', 'The coat hangs by the door.'),
    x('Ten płaszcz jest ciepły.', 'This coat is warm.'),
  ],
  socks: [
    x('Ubieram ciepłe skarpety.', 'I put on warm socks.'),
    x('Skarpety są w szufladzie.', 'The socks are in the drawer.'),
    x('Te skarpety są czarne.', 'These socks are black.'),
  ],
  shoes: [
    x('Ubieram buty do wyjścia.', 'I put on shoes to go out.'),
    x('Buty stoją przy drzwiach.', 'The shoes are by the door.'),
    x('Te buty są wygodne.', 'These shoes are comfortable.'),
  ],
  boots: [
    x('Ubieram kozaki zimą.', 'I put on boots in winter.'),
    x('Kozaki są przy drzwiach.', 'The boots are by the door.'),
    x('Te kozaki są ciepłe.', 'These boots are warm.'),
  ],
  hat: [
    x('Ubieram czapkę na głowę.', 'I put a hat on my head.'),
    x('Czapka chroni przed zimnem.', 'The hat protects from the cold.'),
    x('Ta czapka jest czerwona.', 'This hat is red.'),
  ],
  scarf: [
    x('Zakładam szalik na szyję.', 'I put a scarf around my neck.'),
    x('Szalik jest ciepły.', 'The scarf is warm.'),
    x('Ten szalik jest wełniany.', 'This scarf is wool.'),
  ],
  gloves: [
    x('Ubieram rękawiczki zimą.', 'I put on gloves in winter.'),
    x('Rękawiczki są w kieszeni.', 'The gloves are in the pocket.'),
    x('Te rękawiczki są ciepłe.', 'These gloves are warm.'),
  ],
  shorts: [
    x('Ubieram szorty latem.', 'I put on shorts in summer.'),
    x('Szorty są wygodne.', 'The shorts are comfortable.'),
    x('Te szorty są niebieskie.', 'These shorts are blue.'),
  ],
  slippers: [
    x('W domu noszę kapcie.', 'I wear slippers at home.'),
    x('Kapcie stoją przy łóżku.', 'The slippers are by the bed.'),
    x('Te kapcie są miękkie.', 'These slippers are soft.'),
  ],
  sandals: [
    x('Latem noszę sandały.', 'I wear sandals in summer.'),
    x('Sandały są wygodne na plaży.', 'Sandals are comfortable at the beach.'),
    x('Te sandały są nowe.', 'These sandals are new.'),
  ],
  bikini: [
    x('Na plaży mam kostium.', 'I have a swimsuit at the beach.'),
    x('Kostium schnie na słońcu.', 'The swimsuit is drying in the sun.'),
    x('Ten kostium jest niebieski.', 'This swimsuit is blue.'),
  ],
  glasses: [
    x('Noszę okulary do czytania.', 'I wear glasses to read.'),
    x('Okulary leżą na stole.', 'The glasses are on the table.'),
    x('Bez okularów słabo widzę.', 'Without glasses I see poorly.'),
  ],
  watch: [
    x('Patrzę na zegarek.', 'I look at my watch.'),
    x('Zegarek pokazuje godzinę.', 'The watch shows the time.'),
    x('Zegarek jest na ręce.', 'The watch is on my wrist.'),
  ],
  bag: [
    x('Niosę torbę do sklepu.', 'I carry a bag to the shop.'),
    x('Torba jest ciężka.', 'The bag is heavy.'),
    x('W torbie mam klucze.', 'I have keys in the bag.'),
  ],
  backpack: [
    x('Pakuję książki do plecaka.', 'I pack books in the backpack.'),
    x('Plecak jest na plecach.', 'The backpack is on my back.'),
    x('Ten plecak jest lekki.', 'This backpack is light.'),
  ],
  umbrella: [
    x('Biorę parasol, bo pada.', 'I take an umbrella because it is raining.'),
    x('Parasol stoi przy drzwiach.', 'The umbrella is by the door.'),
    x('Otwieram parasol na ulicy.', 'I open the umbrella on the street.'),
  ],
  ring: [
    x('Noszę pierścionek na palcu.', 'I wear a ring on my finger.'),
    x('Ten pierścionek jest złoty.', 'This ring is gold.'),
    x('Pierścionek leży w pudełku.', 'The ring is in a box.'),
  ],
  wallet: [
    x('Portfel jest w kieszeni.', 'The wallet is in my pocket.'),
    x('W portfelu mam pieniądze.', 'I have money in the wallet.'),
    x('Szukam portfela.', 'I am looking for my wallet.'),
  ],
  tie: [
    x('Zakładam krawat do koszuli.', 'I put on a tie with the shirt.'),
    x('Krawat jest niebieski.', 'The tie is blue.'),
    x('Krawat wisi w szafie.', 'The tie hangs in the closet.'),
  ],
  sunglasses: [
    x('Noszę okulary przeciwsłoneczne latem.', 'I wear sunglasses in summer.'),
    x('Okulary przeciwsłoneczne chronią oczy.', 'Sunglasses protect the eyes.'),
    x('Okulary przeciwsłoneczne są w torbie.', 'The sunglasses are in the bag.'),
  ],
  helmet: [
    x('Zakładam kask na rower.', 'I put on a helmet for the bike.'),
    x('Kask chroni głowę.', 'The helmet protects the head.'),
    x('Kask leży przy rowerze.', 'The helmet is by the bicycle.'),
  ],
  comb: [
    x('Czeszę włosy grzebieniem.', 'I comb my hair with a comb.'),
    x('Grzebień leży przy lustrze.', 'The comb is by the mirror.'),
    x('Potrzebuję grzebienia.', 'I need a comb.'),
  ],
  lipstick: [
    x('Ona maluje usta szminką.', 'She puts on lipstick.'),
    x('Szminka jest czerwona.', 'The lipstick is red.'),
    x('Szminka leży w torbie.', 'The lipstick is in the bag.'),
  ],
  toothbrush: [
    x('Myję zęby szczoteczką.', 'I brush my teeth with a toothbrush.'),
    x('Szczoteczka stoi w kubku.', 'The toothbrush is in a cup.'),
    x('Potrzebuję nowej szczoteczki.', 'I need a new toothbrush.'),
  ],
  sun: [
    x('Słońce świeci mocno.', 'The sun is shining brightly.'),
    x('Lubię ciepło słońca.', 'I like the warmth of the sun.'),
    x('Słońce wstaje rano.', 'The sun rises in the morning.'),
  ],
  moon: [
    x('Księżyc świeci w nocy.', 'The moon shines at night.'),
    x('Widzę księżyc na niebie.', 'I see the moon in the sky.'),
    x('Księżyc jest pełny.', 'The moon is full.'),
  ],
  star: [
    x('Gwiazda świeci w nocy.', 'The star shines at night.'),
    x('Widzę gwiazdę na niebie.', 'I see a star in the sky.'),
    x('Ta gwiazda jest jasna.', 'This star is bright.'),
  ],
  cloud: [
    x('Chmura jest na niebie.', 'The cloud is in the sky.'),
    x('Ciemna chmura oznacza deszcz.', 'A dark cloud means rain.'),
    x('Chmura zasłania słońce.', 'The cloud covers the sun.'),
  ],
  rain: [
    x('Pada deszcz.', 'It is raining.'),
    x('Deszcz jest zimny.', 'The rain is cold.'),
    x('Biorę parasol na deszcz.', 'I take an umbrella for the rain.'),
  ],
  snow: [
    x('Pada śnieg.', 'It is snowing.'),
    x('Śnieg jest biały i zimny.', 'The snow is white and cold.'),
    x('Lubię chodzić po śniegu.', 'I like walking in the snow.'),
  ],
  wind: [
    x('Wiatr jest silny.', 'The wind is strong.'),
    x('Wiatr porusza drzewa.', 'The wind moves the trees.'),
    x('Czuję zimny wiatr.', 'I feel a cold wind.'),
  ],
  storm: [
    x('Burza jest głośna.', 'The storm is loud.'),
    x('W czasie burzy zostaję w domu.', 'During the storm I stay home.'),
    x('Burza idzie z chmur.', 'The storm comes from the clouds.'),
  ],
  rainbow: [
    x('Na niebie jest tęcza.', 'There is a rainbow in the sky.'),
    x('Tęcza ma wiele kolorów.', 'The rainbow has many colors.'),
    x('Widzę tęczę po deszczu.', 'I see a rainbow after the rain.'),
  ],
  lightning: [
    x('Błyskawica rozświetla niebo.', 'Lightning lights up the sky.'),
    x('Boję się błyskawicy.', 'I am afraid of lightning.'),
    x('Błyskawica jest bardzo jasna.', 'Lightning is very bright.'),
  ],
  fog: [
    x('Mgła jest gęsta rano.', 'The fog is thick in the morning.'),
    x('Przez mgłę słabo widać.', 'You can barely see through the fog.'),
    x('Mgła kładzie się na polu.', 'Fog lies over the field.'),
  ],
  ice: [
    x('Lód jest bardzo zimny.', 'Ice is very cold.'),
    x('Na jeziorze jest lód.', 'There is ice on the lake.'),
    x('Lód ślizga się pod nogami.', 'Ice is slippery underfoot.'),
  ],
  thunder: [
    x('Słyszę grzmot.', 'I hear thunder.'),
    x('Grzmot jest głośny.', 'The thunder is loud.'),
    x('Po błyskawicy jest grzmot.', 'After lightning there is thunder.'),
  ],
  sunrise: [
    x('Wschód słońca jest piękny.', 'Sunrise is beautiful.'),
    x('Lubię wschód słońca nad morzem.', 'I like sunrise over the sea.'),
    x('Wstaję na wschód słońca.', 'I get up at sunrise.'),
  ],
  sunset: [
    x('Zachód słońca jest czerwony.', 'Sunset is red.'),
    x('Oglądam zachód słońca z mostu.', 'I watch the sunset from the bridge.'),
    x('Zachód słońca jest spokojny.', 'Sunset is peaceful.'),
  ],
  weather: [
    x('Pogoda jest dziś ładna.', 'The weather is nice today.'),
    x('Sprawdzam pogodę w telefonie.', 'I check the weather on my phone.'),
    x('Jaka jest pogoda?', 'What is the weather like?'),
  ],
  tree: [
    x('Drzewo jest wysokie.', 'The tree is tall.'),
    x('Ptak siedzi na drzewie.', 'A bird sits in the tree.'),
    x('Lubię cień pod drzewem.', 'I like the shade under the tree.'),
  ],
  flower: [
    x('Kwiat pachnie ładnie.', 'The flower smells nice.'),
    x('Daję jej kwiat.', 'I give her a flower.'),
    x('Kwiat stoi w wazonie.', 'The flower is in a vase.'),
  ],
  grass: [
    x('Trawa jest zielona.', 'The grass is green.'),
    x('Dzieci bawią się na trawie.', 'Children play on the grass.'),
    x('Trawa jest mokra od rosy.', 'The grass is wet with dew.'),
  ],
  mountain: [
    x('Góra jest wysoka.', 'The mountain is high.'),
    x('Wchodzę na górę.', 'I climb the mountain.'),
    x('Z góry widać miasto.', 'From the mountain you can see the city.'),
  ],
  sea: [
    x('Morze jest niebieskie.', 'The sea is blue.'),
    x('Pływam w morzu.', 'I swim in the sea.'),
    x('Lubię szum morza.', 'I like the sound of the sea.'),
  ],
  forest: [
    x('Las jest cichy i zielony.', 'The forest is quiet and green.'),
    x('Spaceruję po lesie.', 'I walk in the forest.'),
    x('W lesie rosną grzyby.', 'Mushrooms grow in the forest.'),
  ],
  beach: [
    x('Plaża jest pełna piasku.', 'The beach is full of sand.'),
    x('Leżę na plaży.', 'I lie on the beach.'),
    x('Lubię ciepło na plaży.', 'I like the warmth on the beach.'),
  ],
  rock: [
    x('Kamień jest twardy.', 'The rock is hard.'),
    x('Siedzę na kamieniu.', 'I sit on a rock.'),
    x('Kamień leży przy drodze.', 'The rock lies by the road.'),
  ],
  island: [
    x('Wyspa jest na morzu.', 'The island is in the sea.'),
    x('Płynę na wyspę łodzią.', 'I go to the island by boat.'),
    x('Na wyspie jest plaża.', 'There is a beach on the island.'),
  ],
  desert: [
    x('Pustynia jest sucha i gorąca.', 'The desert is dry and hot.'),
    x('Na pustyni jest piasek.', 'There is sand in the desert.'),
    x('Wielbłąd idzie przez pustynię.', 'A camel walks across the desert.'),
  ],
  volcano: [
    x('Wulkan jest wysoki.', 'The volcano is high.'),
    x('Z wulkanu idzie dym.', 'Smoke comes from the volcano.'),
    x('Widzę wulkan z daleka.', 'I see a volcano from far away.'),
  ],
  field: [
    x('Pole jest złote od zboża.', 'The field is golden with grain.'),
    x('Rolnik pracuje na polu.', 'The farmer works in the field.'),
    x('Idę przez pole.', 'I walk across the field.'),
  ],
  fire: [
    x('Ogień jest gorący.', 'Fire is hot.'),
    x('Siedzę przy ogniu.', 'I sit by the fire.'),
    x('Ogień daje ciepło.', 'Fire gives warmth.'),
  ],
  earth: [
    x('Ziemia kręci się wokół słońca.', 'The earth turns around the sun.'),
    x('Dbam o ziemię.', 'I take care of the earth.'),
    x('Na ziemi rosną drzewa.', 'Trees grow on the earth.'),
  ],
  leaf: [
    x('Liść spada z drzewa.', 'The leaf falls from the tree.'),
    x('Liść jest zielony.', 'The leaf is green.'),
    x('Jesienią liść jest żółty.', 'In autumn the leaf is yellow.'),
  ],
  spring: [
    x('Wiosna jest ciepła i zielona.', 'Spring is warm and green.'),
    x('Lubię wiosnę.', 'I like spring.'),
    x('Wiosną kwitną kwiaty.', 'Flowers bloom in spring.'),
  ],
  autumn: [
    x('Jesień jest złota i chłodna.', 'Autumn is golden and cool.'),
    x('Jesienią spadają liście.', 'Leaves fall in autumn.'),
    x('Lubię zapach jesieni.', 'I like the smell of autumn.'),
  ],
  summer: [
    x('Lato jest gorące.', 'Summer is hot.'),
    x('Latem idę na plażę.', 'In summer I go to the beach.'),
    x('Lubię długie dni lata.', 'I like the long days of summer.'),
  ],
  winter: [
    x('Zima jest zimna i biała.', 'Winter is cold and white.'),
    x('Zimą pada śnieg.', 'It snows in winter.'),
    x('Lubię spokój zimy.', 'I like the quiet of winter.'),
  ],
  eat: [
    x('Lubię jeść zupę.', 'I like to eat soup.'),
    x('Jem obiad o drugiej.', 'I eat lunch at two.'),
    x('Chcę coś jeść.', 'I want to eat something.'),
  ],
  drink: [
    x('Chcę pić wodę.', 'I want to drink water.'),
    x('Lubię pić herbatę.', 'I like to drink tea.'),
    x('Piję sok rano.', 'I drink juice in the morning.'),
  ],
  sleep: [
    x('Chcę spać wcześnie.', 'I want to sleep early.'),
    x('Dziecko idzie spać.', 'The child goes to sleep.'),
    x('Lubię długo spać.', 'I like to sleep late.'),
  ],
  walk: [
    x('Lubię chodzić po parku.', 'I like to walk in the park.'),
    x('Chodzę do sklepu piechotą.', 'I walk to the shop.'),
    x('Pies lubi chodzić.', 'The dog likes to walk.'),
  ],
  run: [
    x('Lubię biegać rano.', 'I like to run in the morning.'),
    x('Biegam w parku.', 'I run in the park.'),
    x('Dziecko lubi biegać.', 'The child likes to run.'),
  ],
  stand: [
    x('Stoję na przystanku.', 'I stand at the stop.'),
    x('Proszę stać tutaj.', 'Please stand here.'),
    x('Stoję w kolejce.', 'I stand in line.'),
  ],
  read: [
    x('Lubię czytać książki.', 'I like to read books.'),
    x('Czytam gazetę rano.', 'I read the newspaper in the morning.'),
    x('Dziecko uczy się czytać.', 'The child is learning to read.'),
  ],
  write: [
    x('Lubię pisać listy.', 'I like to write letters.'),
    x('Piszę imię na kartce.', 'I write a name on the paper.'),
    x('Uczeń musi pisać czytelnie.', 'The student must write clearly.'),
  ],
  speak: [
    x('Lubię mówić po polsku.', 'I like to speak Polish.'),
    x('Mówię wolno i wyraźnie.', 'I speak slowly and clearly.'),
    x('Proszę mówić głośniej.', 'Please speak louder.'),
  ],
  listen: [
    x('Lubię słuchać muzyki.', 'I like to listen to music.'),
    x('Słucham nauczyciela.', 'I listen to the teacher.'),
    x('Proszę słuchać uważnie.', 'Please listen carefully.'),
  ],
  see: [
    x('Widzę ptaka na drzewie.', 'I see a bird in the tree.'),
    x('Nie widzę dobrze bez okularów.', 'I cannot see well without glasses.'),
    x('Chcę widzieć morze.', 'I want to see the sea.'),
  ],
  wash: [
    x('Muszę myć ręce.', 'I need to wash my hands.'),
    x('Myję talerz po obiedzie.', 'I wash the plate after lunch.'),
    x('Dziecko uczy się myć zęby.', 'The child learns to wash their teeth.'),
  ],
  buy: [
    x('Chcę kupować świeży chleb.', 'I want to buy fresh bread.'),
    x('Kupuję mleko w sklepie.', 'I buy milk at the shop.'),
    x('Lubię kupować na targu.', 'I like to buy at the market.'),
  ],
  work: [
    x('Muszę pracować jutro.', 'I have to work tomorrow.'),
    x('Pracuję w biurze.', 'I work in an office.'),
    x('Lubię pracować rano.', 'I like to work in the morning.'),
  ],
  play: [
    x('Dzieci lubią grać w piłkę.', 'Children like to play ball.'),
    x('Gram na komputerze.', 'I play on the computer.'),
    x('Chcę grać z przyjacielem.', 'I want to play with a friend.'),
  ],
  give: [
    x('Chcę dawać prezenty.', 'I want to give gifts.'),
    x('Daję jej kwiat.', 'I give her a flower.'),
    x('Proszę dawać resztę.', 'Please give the change.'),
  ],
  find: [
    x('Lubię znajdować nowe miejsca.', 'I like to find new places.'),
    x('Znajduję książkę na stole.', 'I find the book on the table.'),
    x('Pomóż mi znaleźć klucze.', 'Help me find the keys.'),
  ],
  help: [
    x('Chcę pomagać ludziom.', 'I want to help people.'),
    x('Pomagam mamie w kuchni.', 'I help mom in the kitchen.'),
    x('Proszę mi pomagać.', 'Please help me.'),
  ],
  think: [
    x('Muszę myśleć o tym.', 'I have to think about this.'),
    x('Myślę, że to dobry pomysł.', 'I think this is a good idea.'),
    x('Lubię myśleć w ciszy.', 'I like to think in quiet.'),
  ],
  ask: [
    x('Chcę pytać o drogę.', 'I want to ask for directions.'),
    x('Pytam nauczyciela.', 'I ask the teacher.'),
    x('Nie bój się pytać.', 'Do not be afraid to ask.'),
  ],
  call: [
    x('Muszę dzwonić do mamy.', 'I need to call mom.'),
    x('Dzwonię wieczorem.', 'I call in the evening.'),
    x('Proszę dzwonić jutro.', 'Please call tomorrow.'),
  ],
  send: [
    x('Chcę wysyłać list.', 'I want to send a letter.'),
    x('Wysyłam wiadomość.', 'I send a message.'),
    x('Proszę wysyłać to dziś.', 'Please send this today.'),
  ],
  learn: [
    x('Lubię uczyć się polskiego.', 'I like to learn Polish.'),
    x('Uczę się nowych słów.', 'I learn new words.'),
    x('Chcę uczyć się codziennie.', 'I want to learn every day.'),
  ],
  laugh: [
    x('Lubię śmiać się z przyjaciółmi.', 'I like to laugh with friends.'),
    x('Dziecko zaczyna się śmiać.', 'The child starts to laugh.'),
    x('Ten film każe mi się śmiać.', 'This film makes me laugh.'),
  ],
  happy: [
    x('Jestem dziś szczęśliwy.', 'I am happy today.'),
    x('Szczęśliwy uśmiech jest zaraźliwy.', 'A happy smile is catching.'),
    x('Czuję się szczęśliwy w domu.', 'I feel happy at home.'),
  ],
  sad: [
    x('Jestem trochę smutny.', 'I am a little sad.'),
    x('Smutny film mnie rusza.', 'A sad film moves me.'),
    x('Nie bądź smutny.', 'Do not be sad.'),
  ],
  angry: [
    x('Jestem wściekły na ten hałas.', 'I am angry about this noise.'),
    x('Nie bądź wściekły.', 'Do not be angry.'),
    x('Wściekły pies szczeka.', 'An angry dog barks.'),
  ],
  tired: [
    x('Jestem bardzo zmęczony.', 'I am very tired.'),
    x('Zmęczony idę spać.', 'Tired, I go to sleep.'),
    x('Po pracy jestem zmęczony.', 'After work I am tired.'),
  ],
  hungry: [
    x('Jestem głodny.', 'I am hungry.'),
    x('Głodny jem kanapkę.', 'Hungry, I eat a sandwich.'),
    x('Dziecko jest głodne.', 'The child is hungry.'),
  ],
  thirsty: [
    x('Jestem spragniony.', 'I am thirsty.'),
    x('Spragniony piję wodę.', 'Thirsty, I drink water.'),
    x('Po bieganiu jestem spragniony.', 'After running I am thirsty.'),
  ],
  love: [
    x('To jest wielka miłość.', 'This is a great love.'),
    x('Miłość jest ważna.', 'Love is important.'),
    x('Czuję miłość do rodziny.', 'I feel love for my family.'),
  ],
  kind: [
    x('On jest bardzo miły.', 'He is very kind.'),
    x('Miły uśmiech pomaga.', 'A kind smile helps.'),
    x('Bądź miły dla ludzi.', 'Be kind to people.'),
  ],
  scared: [
    x('Jestem przestraszony burzą.', 'I am scared of the storm.'),
    x('Przestraszony pies szczeka.', 'A scared dog barks.'),
    x('Nie bądź przestraszony.', 'Do not be scared.'),
  ],
  surprised: [
    x('Jestem zaskoczony prezentem.', 'I am surprised by the gift.'),
    x('Zaskoczony otwieram oczy.', 'Surprised, I open my eyes.'),
    x('Jestem zaskoczony ceną.', 'I am surprised by the price.'),
  ],
  good: [
    x('To jest dobry pomysł.', 'This is a good idea.'),
    x('Ten chleb jest dobry.', 'This bread is good.'),
    x('Mam dobry dzień.', 'I am having a good day.'),
  ],
  bad: [
    x('To jest zły pomysł.', 'This is a bad idea.'),
    x('Pogoda jest zła.', 'The weather is bad.'),
    x('Czuję się źle, to zły dzień.', 'I feel unwell; it is a bad day.'),
  ],
  hot: [
    x('Herbata jest gorąca.', 'The tea is hot.'),
    x('Dziś jest gorący dzień.', 'Today is a hot day.'),
    x('Patelnia jest gorąca.', 'The pan is hot.'),
  ],
  cold: [
    x('Woda jest zimna.', 'The water is cold.'),
    x('Dziś jest zimny poranek.', 'Today is a cold morning.'),
    x('Zimny wiatr wieje.', 'A cold wind is blowing.'),
  ],
  new: [
    x('Mam nowy telefon.', 'I have a new phone.'),
    x('To jest nowy płaszcz.', 'This is a new coat.'),
    x('Lubię nowe książki.', 'I like new books.'),
  ],
  old: [
    x('To jest stary dom.', 'This is an old house.'),
    x('Stary most jest piękny.', 'The old bridge is beautiful.'),
    x('Mam stary rower.', 'I have an old bicycle.'),
  ],
  slow: [
    x('Ten autobus jest wolny.', 'This bus is slow.'),
    x('Mów wolno, proszę.', 'Speak slowly, please.'),
    x('Żółw jest wolny.', 'The turtle is slow.'),
  ],
  fast: [
    x('Ten pociąg jest szybki.', 'This train is fast.'),
    x('Samochód jedzie szybko.', 'The car goes fast.'),
    x('Lubię szybką muzykę.', 'I like fast music.'),
  ],
  long: [
    x('To jest długa droga.', 'This is a long road.'),
    x('Film jest długi.', 'The film is long.'),
    x('Ma długie włosy.', 'She has long hair.'),
  ],
  strong: [
    x('On jest silny.', 'He is strong.'),
    x('On ma silne ramiona.', 'He has strong arms.'),
    x('Potrzebuję silnych rąk.', 'I need strong hands.'),
  ],
  loud: [
    x('Muzyka jest głośna.', 'The music is loud.'),
    x('Głośny tramwaj jedzie.', 'A loud tram is going by.'),
    x('Nie mów tak głośno.', 'Do not speak so loud.'),
  ],
  quiet: [
    x('Biblioteka jest cicha.', 'The library is quiet.'),
    x('Noc jest cicha.', 'The night is quiet.'),
    x('Proszę o cichy głos.', 'Please use a quiet voice.'),
  ],
  dark: [
    x('Pokój jest ciemny.', 'The room is dark.'),
    x('W nocy jest ciemno.', 'It is dark at night.'),
    x('Ciemny las jest cichy.', 'The dark forest is quiet.'),
  ],
  bright: [
    x('Światło jest jasne.', 'The light is bright.'),
    x('Dzień jest jasny.', 'The day is bright.'),
    x('Jasny pokój jest miły.', 'A bright room is pleasant.'),
  ],
  left: [
    x('To jest lewy zakręt.', 'This is a left turn.'),
    x('Książka leży po lewej.', 'The book is on the left.'),
    x('Lewy but jest tu.', 'The left shoe is here.'),
  ],
  right: [
    x('To jest prawy zakręt.', 'This is a right turn.'),
    x('Prawa ręka boli.', 'The right hand hurts.'),
    x('Idź w prawo.', 'Go to the right.'),
  ],
  free: [
    x('Jestem dziś wolny.', 'I am free today.'),
    x('Ten wieczór jest wolny.', 'This evening is free.'),
    x('Czuję się wolny w parku.', 'I feel free in the park.'),
  ],
  'core-nie': [
    x('Nie chcę kawy.', 'I do not want coffee.'),
    x('To nie jest trudne.', 'This is not hard.'),
    x('Nie, dziękuję.', 'No, thank you.'),
  ],
  'core-to': [
    x('To jest dobry pomysł.', 'This is a good idea.'),
    x('Co to jest?', 'What is this?'),
    x('To mój dom.', 'This is my house.'),
  ],
  'core-sie': [
    x('Uczę się polskiego.', 'I am learning Polish.'),
    x('Proszę, usiądź tutaj.', 'Please sit down here.'),
    x('Boję się burzy.', 'I am afraid of the storm.'),
  ],
  'core-i': [
    x('Chleb i masło.', 'Bread and butter.'),
    x('Ja i ty idziemy.', 'You and I are going.'),
    x('Herbata i cytryna.', 'Tea and lemon.'),
  ],
  'core-w': [
    x('Jestem w domu.', 'I am at home.'),
    x('Książka jest w torbie.', 'The book is in the bag.'),
    x('Mieszkam w Warszawie.', 'I live in Warsaw.'),
  ],
  'core-na': [
    x('Kładę klucz na stole.', 'I put the key on the table.'),
    x('Spotkamy się na dworcu.', 'We will meet at the station.'),
    x('Idę na spacer.', 'I am going for a walk.'),
  ],
  'core-z': [
    x('Idę z przyjacielem.', 'I am going with a friend.'),
    x('Herbata z cytryną.', 'Tea with lemon.'),
    x('Wracam z pracy.', 'I am coming back from work.'),
  ],
  'core-do': [
    x('Idę do sklepu.', 'I am going to the shop.'),
    x('Wlewam wodę do szklanki.', 'I pour water into a glass.'),
    x('Jedziemy do miasta.', 'We are going to the city.'),
  ],
  'core-ze': [
    x('Wiem, że to prawda.', 'I know that this is true.'),
    x('Mówi, że pada deszcz.', 'He says that it is raining.'),
    x('Cieszę się, że jesteś.', 'I am glad that you are here.'),
  ],
  'core-co': [
    x('Co to jest?', 'What is this?'),
    x('Co chcesz jeść?', 'What do you want to eat?'),
    x('Nie wiem, co robić.', 'I do not know what to do.'),
  ],
  'core-tak': [
    x('Tak, proszę.', 'Yes, please.'),
    x('Tak, to dobry pomysł.', 'Yes, that is a good idea.'),
    x('Zrób to tak.', 'Do it like this.'),
  ],
  'core-jak': [
    x('Jak się masz?', 'How are you?'),
    x('Jak to powiedzieć?', 'How do you say this?'),
    x('Jest zimno jak lód.', 'It is cold like ice.'),
  ],
  'core-ale': [
    x('Chcę iść, ale pada.', 'I want to go, but it is raining.'),
    x('Dobry, ale drogi.', 'Good, but expensive.'),
    x('Szybko, ale ostrożnie.', 'Fast, but carefully.'),
  ],
  'core-o': [
    x('Mówimy o pogodzie.', 'We are talking about the weather.'),
    x('Myślę o tobie.', 'I am thinking about you.'),
    x('Książka jest o domu.', 'The book is about a house.'),
  ],
  'core-a': [
    x('Ja piję kawę, a ty herbatę.', 'I drink coffee, and you drink tea.'),
    x('Chcę iść, a pada.', 'I want to go, but it is raining.'),
    x('On czyta, a ona pisze.', 'He reads, and she writes.'),
  ],
  'core-za': [
    x('Dziękuję za pomoc.', 'Thank you for the help.'),
    x('Stoję za drzwiami.', 'I am standing behind the door.'),
    x('To za drogie.', 'This is too expensive.'),
  ],
  'core-po': [
    x('Dzwonię po obiedzie.', 'I will call after lunch.'),
    x('Idziemy po drodze.', 'We walk along the road.'),
    x('Herbata po obiedzie.', 'Tea after lunch.'),
  ],
  'core-od': [
    x('Idę od dworca.', 'I am coming from the station.'),
    x('Pracuję od rana.', 'I have been working since morning.'),
    x('To prezent od mamy.', 'This is a gift from mom.'),
  ],
  'core-dla': [
    x('To kwiat dla ciebie.', 'This flower is for you.'),
    x('Herbata dla gości.', 'Tea for the guests.'),
    x('Robię to dla rodziny.', 'I am doing this for the family.'),
  ],
  'core-przez': [
    x('Idę przez most.', 'I walk through the bridge.'),
    x('Dzwonię przez telefon.', 'I call through the phone.'),
    x('Spóźniłem się przez deszcz.', 'I was late because of the rain.'),
  ],
  'core-czy': [
    x('Czy lubisz kawę?', 'Do you like coffee?'),
    x('Nie wiem, czy przyjdzie.', 'I do not know whether he will come.'),
    x('Czy to twój klucz?', 'Is this your key?'),
  ],
  'core-tylko': [
    x('Chcę tylko wodę.', 'I only want water.'),
    x('To tylko mały problem.', 'This is just a small problem.'),
    x('Został tylko jeden bilet.', 'There is only one ticket left.'),
  ],
  'core-bardzo': [
    x('Jestem bardzo zmęczony.', 'I am very tired.'),
    x('To bardzo dobry film.', 'This is a very good film.'),
    x('Bardzo dziękuję.', 'Thank you very much.'),
  ],
  'core-juz': [
    x('Już jestem w domu.', 'I am already at home.'),
    x('Pociąg już odjechał.', 'The train has already left.'),
    x('Już rozumiem.', 'I already understand.'),
  ],
  'core-jeszcze': [
    x('Jeszcze pada deszcz.', 'It is still raining.'),
    x('Nie skończyłem jeszcze.', 'I have not finished yet.'),
    x('Chcę jeszcze herbaty.', 'I want more tea.'),
  ],
  'core-teraz': [
    x('Teraz idę do pracy.', 'I am going to work now.'),
    x('Zrób to teraz.', 'Do it now.'),
    x('Teraz jest ciepło.', 'It is warm now.'),
  ],
  'core-tu': [
    x('Jestem tu.', 'I am here.'),
    x('Połóż książkę tu.', 'Put the book here.'),
    x('Tu jest moja szkoła.', 'My school is here.'),
  ],
  'core-tam': [
    x('On stoi tam.', 'He is standing there.'),
    x('Idziemy tam wieczorem.', 'We are going there in the evening.'),
    x('Tam pada deszcz.', 'It is raining there.'),
  ],
  'core-moze': [
    x('Może jutro.', 'Maybe tomorrow.'),
    x('Może pójść z nami.', 'He can go with us.'),
    x('Może to dobry pomysł.', 'Maybe this is a good idea.'),
  ],
  'core-bo': [
    x('Zostaję, bo pada.', 'I stay because it is raining.'),
    x('Jem, bo jestem głodny.', 'I eat because I am hungry.'),
    x('Dzwonię, bo potrzebuję pomocy.', 'I call because I need help.'),
  ],
  'core-wiec': [
    x('Pada, więc biorę parasol.', 'It is raining, so I take an umbrella.'),
    x('Skończyłem, więc idę spać.', 'I finished, so I go to sleep.'),
    x('Lubisz kawę, więc piję kawę.', 'You like coffee, so I drink coffee.'),
  ],
  'core-kiedy': [
    x('Kiedy wracasz?', 'When are you coming back?'),
    x('Dzwonię, kiedy mam czas.', 'I call when I have time.'),
    x('Kiedy pada, zostaję w domu.', 'When it rains, I stay home.'),
  ],
  'core-gdzie': [
    x('Gdzie jest klucz?', 'Where is the key?'),
    x('Gdzie mieszkasz?', 'Where do you live?'),
    x('Nie wiem, gdzie iść.', 'I do not know where to go.'),
  ],
  'core-dlaczego': [
    x('Dlaczego pada?', 'Why is it raining?'),
    x('Dlaczego jesteś smutny?', 'Why are you sad?'),
    x('Nie wiem, dlaczego.', 'I do not know why.'),
  ],
  'core-kto': [
    x('Kto to jest?', 'Who is this?'),
    x('Kto dzwoni?', 'Who is calling?'),
    x('Nie wiem, kto przyszedł.', 'I do not know who came.'),
  ],
  'core-ktory': [
    x('Który autobus jedzie do miasta?', 'Which bus goes to the city?'),
    x('To człowiek, który pomaga.', 'This is the person who helps.'),
    x('Który chleb chcesz?', 'Which bread do you want?'),
  ],
  'core-cos': [
    x('Chcę coś jeść.', 'I want to eat something.'),
    x('Słyszę coś na zewnątrz.', 'I hear something outside.'),
    x('Powiedz mi coś.', 'Tell me something.'),
  ],
  'core-nic': [
    x('Nic nie wiem.', 'I know nothing.'),
    x('Tu nic nie ma.', 'There is nothing here.'),
    x('Nic się nie stało.', 'Nothing happened.'),
  ],
  'core-ktos': [
    x('Ktoś dzwoni do drzwi.', 'Someone is ringing the doorbell.'),
    x('Ktoś zostawił klucz.', 'Someone left a key.'),
    x('Widzę kogoś w parku.', 'I see someone in the park.'),
  ],
  'core-wszystko': [
    x('Rozumiem wszystko.', 'I understand everything.'),
    x('Wszystko jest w porządku.', 'Everything is fine.'),
    x('Zjadłem wszystko.', 'I ate everything.'),
  ],
  'core-ja': [
    x('Ja idę do sklepu.', 'I am going to the shop.'),
    x('Ja lubię kawę.', 'I like coffee.'),
    x('To zrobiłem ja.', 'I did this.'),
  ],
  'core-ty': [
    x('Ty jesteś miły.', 'You are kind.'),
    x('Czekam na ciebie, ty idziesz.', 'I am waiting for you; you are coming.'),
    x('Ty masz klucz.', 'You have the key.'),
  ],
  'core-on': [
    x('On czyta książkę.', 'He is reading a book.'),
    x('On jest w pracy.', 'He is at work.'),
    x('Lubię, gdy on śpiewa.', 'I like it when he sings.'),
  ],
  'core-ona': [
    x('Ona pije herbatę.', 'She is drinking tea.'),
    x('Ona mieszka blisko.', 'She lives nearby.'),
    x('Widzę ją; ona macha.', 'I see her; she is waving.'),
  ],
  'core-my': [
    x('My idziemy do kina.', 'We are going to the cinema.'),
    x('My mieszkamy tutaj.', 'We live here.'),
    x('My potrzebujemy pomocy.', 'We need help.'),
  ],
  'core-wy': [
    x('Wy jesteście w domu.', 'You are at home.'),
    x('Wy lubicie kawę?', 'Do you like coffee?'),
    x('Czekam, aż wy przyjdziecie.', 'I am waiting until you come.'),
  ],
  'core-oni': [
    x('Oni pracują razem.', 'They work together.'),
    x('Oni są w parku.', 'They are in the park.'),
    x('Widzę ich; oni idą.', 'I see them; they are walking.'),
  ],
  'core-moj': [
    x('To jest mój klucz.', 'This is my key.'),
    x('Mój dom jest mały.', 'My house is small.'),
    x('Lubię mój rower.', 'I like my bicycle.'),
  ],
  'core-twoj': [
    x('Gdzie jest twój telefon?', 'Where is your phone?'),
    x('Twój chleb jest świeży.', 'Your bread is fresh.'),
    x('To twój autobus.', 'This is your bus.'),
  ],
  'core-jego': [
    x('To jego torba.', 'This is his bag.'),
    x('Lubię jego uśmiech.', 'I like his smile.'),
    x('Jego dom jest blisko.', 'His house is nearby.'),
  ],
  'core-jej': [
    x('To jej książka.', 'This is her book.'),
    x('Lubię jej głos.', 'I like her voice.'),
    x('Jej kawa jest gorąca.', 'Her coffee is hot.'),
  ],
  'core-ich': [
    x('To ich auto.', 'This is their car.'),
    x('Ich dom jest duży.', 'Their house is big.'),
    x('Lubię ich psa.', 'I like their dog.'),
  ],
  'core-byc': [
    x('Chcę być w domu.', 'I want to be at home.'),
    x('To może być trudne.', 'This can be hard.'),
    x('Miło być tutaj.', 'It is nice to be here.'),
  ],
  'core-miec': [
    x('Chcę mieć czas.', 'I want to have time.'),
    x('Muszę mieć klucz.', 'I need to have the key.'),
    x('Lubię mieć wodę w torbie.', 'I like to have water in my bag.'),
  ],
  'core-robic': [
    x('Lubię robić herbatę.', 'I like to make tea.'),
    x('Muszę robić obiad.', 'I have to make dinner.'),
    x('Co chcesz robić?', 'What do you want to do?'),
  ],
  'core-wiedziec': [
    x('Chcę wiedzieć prawdę.', 'I want to know the truth.'),
    x('Nie mogę wiedzieć wszystkiego.', 'I cannot know everything.'),
    x('Dobrze jest wiedzieć to.', 'It is good to know this.'),
  ],
  'core-chciec': [
    x('Chcę pić wodę.', 'I want to drink water.'),
    x('Nie chcę iść.', 'I do not want to go.'),
    x('Czy chcesz kawę?', 'Do you want coffee?'),
  ],
  'core-moc': [
    x('Mogę pomóc.', 'I can help.'),
    x('Nie mogę dziś przyjść.', 'I cannot come today.'),
    x('Czy możesz poczekać?', 'Can you wait?'),
  ],
  'core-musiec': [
    x('Muszę iść do pracy.', 'I have to go to work.'),
    x('Musisz to zrobić.', 'You must do this.'),
    x('Nie muszę dziś pracować.', 'I do not have to work today.'),
  ],
  'core-powiedziec': [
    x('Chcę powiedzieć prawdę.', 'I want to tell the truth.'),
    x('Powiedz mi, proszę.', 'Tell me, please.'),
    x('Nie wiem, co powiedzieć.', 'I do not know what to say.'),
  ],
  'core-mowic': [
    x('Lubię mówić po polsku.', 'I like to speak Polish.'),
    x('Mów wolno, proszę.', 'Speak slowly, please.'),
    x('Ona lubi mówić cicho.', 'She likes to speak quietly.'),
  ],
  'core-isc': [
    x('Chcę iść do domu.', 'I want to go home.'),
    x('Muszę iść teraz.', 'I have to go now.'),
    x('Lubię iść piechotą.', 'I like to go on foot.'),
  ],
  'core-dac': [
    x('Chcę dać ci kwiat.', 'I want to give you a flower.'),
    x('Daj mi klucz, proszę.', 'Give me the key, please.'),
    x('Mogę dać ci wodę.', 'I can give you water.'),
  ],
  'core-wziac': [
    x('Chcę wziąć parasol.', 'I want to take an umbrella.'),
    x('Weź chleb ze stołu.', 'Take the bread from the table.'),
    x('Muszę wziąć bilet.', 'I have to take a ticket.'),
  ],
  'core-widziec': [
    x('Chcę widzieć morze.', 'I want to see the sea.'),
    x('Nie mogę widzieć bez okularów.', 'I cannot see without glasses.'),
    x('Lubię widzieć przyjaciół.', 'I like to see friends.'),
  ],
  'core-jesc': [
    x('Lubię jeść zupę.', 'I like to eat soup.'),
    x('Chcę coś jeść.', 'I want to eat something.'),
    x('Muszę jeść śniadanie.', 'I have to eat breakfast.'),
  ],
  'core-pic': [
    x('Chcę pić wodę.', 'I want to drink water.'),
    x('Lubię pić herbatę.', 'I like to drink tea.'),
    x('Nie mogę pić kawy wieczorem.', 'I cannot drink coffee in the evening.'),
  ],
  'core-potrzebowac': [
    x('Potrzebuję pomocy.', 'I need help.'),
    x('Czy potrzebujesz wody?', 'Do you need water?'),
    x('Nie potrzebuję nic więcej.', 'I do not need anything else.'),
  ],
  'core-znac': [
    x('Znam tę ulicę.', 'I know this street.'),
    x('Czy znasz mojego brata?', 'Do you know my brother?'),
    x('Lubię znać sąsiadów.', 'I like to know the neighbors.'),
  ],
  'core-dobrze': [
    x('Czuję się dobrze.', 'I feel well.'),
    x('Dobrze, zróbmy to.', 'Okay, let’s do it.'),
    x('On mówi dobrze po polsku.', 'He speaks Polish well.'),
  ],
  'core-dobry': [
    x('To dobry chleb.', 'This is good bread.'),
    x('Masz dobry pomysł.', 'You have a good idea.'),
    x('To był dobry dzień.', 'That was a good day.'),
  ],
  'core-zly': [
    x('To zły pomysł.', 'This is a bad idea.'),
    x('Pogoda jest zła.', 'The weather is bad.'),
    x('Nie bądź zły.', 'Do not be angry.'),
  ],
  'core-duzy': [
    x('To duży dom.', 'This is a big house.'),
    x('Mam duży plecak.', 'I have a big backpack.'),
    x('Ten pies jest duży.', 'This dog is big.'),
  ],
  'core-maly': [
    x('To mały stół.', 'This is a small table.'),
    x('Mam mały problem.', 'I have a small problem.'),
    x('Kot jest mały.', 'The cat is small.'),
  ],
  'core-duzo': [
    x('Mam dużo pracy.', 'I have a lot of work.'),
    x('Pada dużo deszczu.', 'There is a lot of rain.'),
    x('Lubię dużo wody.', 'I like a lot of water.'),
  ],
  'core-malo': [
    x('Mam mało czasu.', 'I have little time.'),
    x('W szklance jest mało wody.', 'There is little water in the glass.'),
    x('Jem mało mięsa.', 'I eat little meat.'),
  ],
  'core-nowy': [
    x('Mam nowy telefon.', 'I have a new phone.'),
    x('To nowy płaszcz.', 'This is a new coat.'),
    x('Lubię nowe książki.', 'I like new books.'),
  ],
  'core-inny': [
    x('Chcę inny chleb.', 'I want a different bread.'),
    x('To inny autobus.', 'This is a different bus.'),
    x('Mamy inny pomysł.', 'We have another idea.'),
  ],
  'core-jeden': [
    x('Chcę jeden bilet.', 'I want one ticket.'),
    x('Został jeden kawałek.', 'There is one piece left.'),
    x('Mam jeden klucz.', 'I have one key.'),
  ],
  'core-dwa': [
    x('Chcę dwa bilety.', 'I want two tickets.'),
    x('Mam dwa koty.', 'I have two cats.'),
    x('Czekam dwie minuty.', 'I wait two minutes.'),
  ],
  'core-dzien': [
    x('Dziś jest ładny dzień.', 'Today is a nice day.'),
    x('Dobry dzień!', 'Good day!'),
    x('Pracuję cały dzień.', 'I work all day.'),
  ],
  'core-czas': [
    x('Nie mam czasu.', 'I do not have time.'),
    x('To dobry czas na herbatę.', 'This is a good time for tea.'),
    x('Czas iść do domu.', 'It is time to go home.'),
  ],
  'core-dom': [
    x('Idę do domu.', 'I am going home.'),
    x('Mój dom jest mały.', 'My house is small.'),
    x('Lubię być w domu.', 'I like being at home.'),
  ],
  'core-praca': [
    x('Idę do pracy.', 'I am going to work.'),
    x('Praca zaczyna się rano.', 'Work starts in the morning.'),
    x('Lubię moją pracę.', 'I like my work.'),
  ],
  'core-czlowiek': [
    x('To miły człowiek.', 'This is a kind person.'),
    x('Widzę człowieka na ulicy.', 'I see a person on the street.'),
    x('Każdy człowiek potrzebuje snu.', 'Every person needs sleep.'),
  ],
  'core-ludzie': [
    x('Ludzie czekają na autobus.', 'People are waiting for the bus.'),
    x('Lubię pomagać ludziom.', 'I like helping people.'),
    x('Na rynku jest dużo ludzi.', 'There are a lot of people in the square.'),
  ],
  'core-rzecz': [
    x('To ważna rzecz.', 'This is an important thing.'),
    x('Weź tę rzecz ze stołu.', 'Take this thing from the table.'),
    x('Jedna rzecz na raz.', 'One thing at a time.'),
  ],
  'core-pan': [
    x('Dzień dobry, panie Kowalski.', 'Good day, Mr. Kowalski.'),
    x('Czy pan chce kawę?', 'Would you like coffee, sir?'),
    x('Ten pan czeka na autobus.', 'This gentleman is waiting for the bus.'),
  ],
  'core-pani': [
    x('Dzień dobry, pani Anno.', 'Good day, Mrs. Anna.'),
    x('Czy pani potrzebuje pomocy?', 'Do you need help, ma’am?'),
    x('Ta pani czyta książkę.', 'This lady is reading a book.'),
  ],
  'core-prosze': [
    x('Proszę, usiądź.', 'Please, sit down.'),
    x('Kawę, proszę.', 'Coffee, please.'),
    x('Proszę, oto twój klucz.', 'Here you go, here is your key.'),
  ],
  'core-dziekuje': [
    x('Dziękuję za pomoc.', 'Thank you for the help.'),
    x('Bardzo dziękuję.', 'Thank you very much.'),
    x('Dziękuję, to wszystko.', 'Thank you, that is all.'),
  ],
  'core-przepraszam': [
    x('Przepraszam, gdzie jest dworzec?', 'Excuse me, where is the station?'),
    x('Przepraszam za spóźnienie.', 'Sorry for being late.'),
    x('Przepraszam, nie zrozumiałem.', 'Sorry, I did not understand.'),
  ],
  'core-naprawde': [
    x('Naprawdę lubię tę zupę.', 'I really like this soup.'),
    x('To naprawdę dobry pomysł.', 'This is really a good idea.'),
    x('Naprawdę nie wiem.', 'I really do not know.'),
  ],
  'core-zawsze': [
    x('Zawsze piję kawę rano.', 'I always drink coffee in the morning.'),
    x('On zawsze pomaga.', 'He always helps.'),
    x('Zawsze zamykam drzwi.', 'I always lock the door.'),
  ],
  'core-nigdy': [
    x('Nigdy nie jem mięsa.', 'I never eat meat.'),
    x('On nigdy się nie spóźnia.', 'He is never late.'),
    x('Nigdy nie byłem w Krakowie.', 'I have never been to Krakow.'),
  ],
  'core-tez': [
    x('Ja też chcę herbatę.', 'I want tea too.'),
    x('Ona też idzie do sklepu.', 'She is also going to the shop.'),
    x('To też dobry pomysł.', 'This is also a good idea.'),
  ],
  'core-nawet': [
    x('Nawet dzieci to wiedzą.', 'Even children know this.'),
    x('Nie mam nawet czasu.', 'I do not even have time.'),
    x('Nawet w deszczu idę.', 'I go even in the rain.'),
  ],
  'core-razem': [
    x('Idziemy razem do kina.', 'We are going to the cinema together.'),
    x('Mieszkamy razem.', 'We live together.'),
    x('Zróbmy to razem.', 'Let’s do this together.'),
  ],
  'core-sam': [
    x('Idę sam do sklepu.', 'I am going to the shop alone.'),
    x('On mieszka sam.', 'He lives alone.'),
    x('Zrobiłem to sam.', 'I did this myself.'),
  ],
  'core-prawda': [
    x('To prawda.', 'That is true.'),
    x('Powiedz mi prawdę.', 'Tell me the truth.'),
    x('Prawda jest prosta.', 'The truth is simple.'),
  ],
}

export function examplesFor(id: string): Example[] {
  return EXAMPLES[id] ?? []
}

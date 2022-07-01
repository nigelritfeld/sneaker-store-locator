# Sneaker store locator

De sneaker store locator is mobile app, waarbij echte sneaker heads, de beste sneaker stores in rotterdam kunnen vinden.

### Basis eisen
-[x] De opdracht is uitgewerkt volgens bovenstaande omschrijving en heeft een passende
   naam (‘eindopdracht’ is geen goede naam)
-[x] Er staan comments in de code ter verduidelijking
-[x] De app is verdeeld in componenten met het oog op herbruikbaarheid, die in aparte
   javascript bestanden staan
-[x] Je gebruikt JSON-data uit een web API
   1. Google Places API
   2. Webscraping RSS Feed
   3. Link preview fetching
-[x] Er worden gegevens lokaal opgeslagen, die in een lijstweergave getoond worden
   1. SQLite Database
   2. Stores list
   3. Settings in async storage
-[x] De app heeft verschillende layout modi, die via (eigen) settings in te stellen zijn
   1. Light & Dark modes in drawer navigation
-[x] Je maakt gebruik van locatie en maps. Zowel de huidige locatie als de locatie van
   een hotspot kunnen getoond worden
   1. Hotspots
   2. Eigen locatie en directie worden getoont
-[x] Er worden parameters tussen verschillende schermen heen en weer gestuurd
   1. Show on map button stuurt id naar map pagina

### Extra toevoegingen voor een hoger cijfer zijn:
1. Je gebruikt background activiteit met notificaties om te tonen dat je ergens in de buurt
   bent als de app gesloten is
   1. Push notificaties wanneer je in de buurt bent
2. Je gebruikt biometrische beveiliging
   1. Biometrische beveiliging voor events pagina
3. Je app helpt om een locatie te vinden (kompasmodus)
   1. Compas word getoond op te map
4. Je kunt de lokale gegevens bewerken (edit en delete), en delen (share)
   1. Stores worden 
5. Het ontbreken van een internetverbinding wordt opgelost in de app
   1. Feedback bericht
6. Een eigen toevoeging in overleg met de docent (overleg dit uiterlijk tijdens de laatste
   workshop in week 8)
   1.  Event word aangemaakt in calendar.

# Technischer Aufbau

## Ziel

Die Website soll schnell, zuverlässig, barrierearm und leicht veränderbar bleiben.
Sie ist eine Unternehmenswebsite – kein Framework-Demoprojekt.

## Entscheidungen

### Statische Website ohne Build-Schritt

Die Seite besteht aus HTML, CSS und wenig JavaScript. Das vermeidet Laufzeit- und
Build-Abhängigkeiten, verkürzt Ladezeiten und macht jede veröffentlichte Version
auch in Zukunft direkt lesbar.

### Progressive Verbesserung

Alle wesentlichen Inhalte funktionieren ohne JavaScript. JavaScript ergänzt nur
den Farbschema-Schalter, das mobile Menü und die automatisch aktuelle Jahreszahl.

### Keine externen Ressourcen

Schriften, Darstellung und Favicon kommen aus dem Repository. Die Website bindet
keine Tracker, Analysewerkzeuge oder Drittanbieter-CDNs ein und setzt selbst keine Cookies.

### GitHub Pages

Ein Push auf `main` startet den Workflow `.github/workflows/pages.yml`. Er lädt die
statischen Dateien als Pages-Artefakt hoch und veröffentlicht sie mit HTTPS. Die
Domain `computerfuzzies.com` wird separat in GitHub Pages und beim DNS-Anbieter
zugeordnet; der Workflow benötigt dafür keine `CNAME`-Datei.

## Projektstruktur

```text
.
├── .github/workflows/pages.yml  # Veröffentlichung
├── assets/                      # lokale Medien und Icons
├── docs/                        # technische Dokumentation
├── 404.html                     # Fehlerseite
├── index.html                   # Inhalt und Struktur
├── styles.css                   # Gestaltung und responsive Regeln
├── script.js                    # optionale Interaktionen
├── CHANGELOG.md                 # sichtbare Änderungen pro Version
├── VERSION                      # aktuelle Versionsnummer
└── VERSIONING.md                # Regeln und Wiederherstellung
```

## Leitplanken für Änderungen

- Inhalte bleiben auch ohne JavaScript erreichbar.
- Neue Bibliotheken brauchen einen konkreten Nutzen, nicht nur Neuheitswert.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten ins Repository schreiben.
- Vor jeder Veröffentlichung interne Links und das Pages-Deployment prüfen.
- Sichtbare Änderungen im Changelog dokumentieren und sinnvoll versionieren.

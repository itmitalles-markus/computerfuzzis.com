# computerfuzzis.com

**Versionshistorie:** [Was wurde geändert?](CHANGELOG.md) · [Releases und Downloads](https://github.com/itmitalles-markus/computerfuzzis.com/releases) · [Pflege der Historie](VERSIONING.md)

Die Website für **computerfuzzis.com** – schnell, zugänglich und ohne Build-Abhängigkeiten.

## Lokal ansehen

Im Projektordner einen einfachen Webserver starten:

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen.

## Veröffentlichung

Jeder Push auf `main` veröffentlicht die Seite über GitHub Actions auf GitHub Pages.
Vor dem ersten Deployment muss im Repository unter **Settings → Pages → Source** einmal **GitHub Actions** ausgewählt werden.

Solange die neue Domain noch nicht mit GitHub Pages verbunden ist, lautet die Vorschauadresse:

```text
https://itmitalles-markus.github.io/computerfuzzis.com/
```

Die Domain `computerfuzzis.com` wird in den Pages-Einstellungen und beim DNS-Anbieter verbunden.
Da die Veröffentlichung über einen eigenen GitHub-Actions-Workflow läuft, ist dafür
keine `CNAME`-Datei im Repository erforderlich.

## Technik

- semantisches HTML
- responsives CSS mit Hell-/Dunkelmodus
- kleines, optionales JavaScript ohne Framework
- datensparsame Umsetzung ohne Tracking, externe Schriften oder Kontaktformular
- Impressum und Datenschutzerklärung für den aktuellen Betrieb über GitHub Pages
- modularer VoIP-/PBX-Erklärbereich mit zugänglichen Einzelszenarien
- lokaler, regelbasierter Leistungskonfigurator ohne Datentransfer
- eigene 404-Seite und SVG-Favicon
- automatisches Deployment mit GitHub Pages

## Versionen

Veröffentlichte Stände erhalten eine feste Versionsnummer, einen Git-Tag und ein
GitHub-Release. Die aktuelle Version steht in [`VERSION`](VERSION), sichtbare
Änderungen in [`CHANGELOG.md`](CHANGELOG.md).

Wie man Versionen vergleicht oder wiederherstellt, beschreibt
[`VERSIONING.md`](VERSIONING.md). Hintergründe zum schlanken technischen Aufbau
stehen unter [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

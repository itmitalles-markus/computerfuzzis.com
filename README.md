# computerfuzzi.de

Die zukünftige Website für **computerfuzzi.de** – schnell, zugänglich und ohne Build-Abhängigkeiten.

## Lokal ansehen

Im Projektordner einen einfachen Webserver starten:

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen.

## Veröffentlichung

Jeder Push auf `main` veröffentlicht die Seite über GitHub Actions auf GitHub Pages.
Vor dem ersten Deployment muss im Repository unter **Settings → Pages → Source** einmal **GitHub Actions** ausgewählt werden.

Solange keine eigene Domain verbunden ist, lautet die Adresse:

```text
https://itmitalles-markus.github.io/computerfuzzi.de/
```

Die Domain `computerfuzzi.de` wird später in den Pages-Einstellungen und beim DNS-Anbieter verbunden. Bis dahin ist keine `CNAME`-Datei nötig.

## Technik

- semantisches HTML
- responsives CSS mit Hell-/Dunkelmodus
- kleines, optionales JavaScript ohne Framework
- eigene 404-Seite und SVG-Favicon
- automatisches Deployment mit GitHub Pages

## Versionen

Veröffentlichte Stände erhalten eine feste Versionsnummer, einen Git-Tag und ein
GitHub-Release. Die aktuelle Version steht in [`VERSION`](VERSION), sichtbare
Änderungen in [`CHANGELOG.md`](CHANGELOG.md).

Wie man Versionen vergleicht oder wiederherstellt, beschreibt
[`VERSIONING.md`](VERSIONING.md). Hintergründe zum schlanken technischen Aufbau
stehen unter [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

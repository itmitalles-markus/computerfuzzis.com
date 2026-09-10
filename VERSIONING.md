# Versionierung

Jede veröffentlichte Fassung der Website bekommt eine eindeutige Versionsnummer,
einen Git-Tag und ein GitHub-Release. Dadurch bleibt sie dauerhaft auffindbar,
vergleichbar und wiederherstellbar.

## Versionsnummern

Das Projekt verwendet das Schema `MAJOR.MINOR.PATCH`:

- **MAJOR** – grundlegender Neubau oder bewusst inkompatible Änderung
- **MINOR** – neue Inhalte, Bereiche oder sichtbare Funktionen
- **PATCH** – kleine Korrekturen an Text, Darstellung, Barrierefreiheit oder Technik

Beispiele:

- `0.1.0` – erste Landingpage
- `0.2.0` – ausführliches persönliches Profil kommt hinzu
- `0.2.1` – ein Tippfehler oder Darstellungsfehler wird korrigiert
- `1.0.0` – die Website gilt inhaltlich als vollständig

Vor Version `1.0.0` darf sich die Struktur noch deutlich weiterentwickeln.

## Eine frühere Version ansehen

Alle Versionen und die zugehörigen Hinweise stehen unter
[GitHub Releases](https://github.com/itmitalles-markus/computerfuzzis.com/releases).

Eine Datei aus einer Version im Terminal anzeigen:

```bash
git show v0.1.0:index.html
```

Unterschiede zwischen einer Version und dem aktuellen Stand anzeigen:

```bash
git diff v0.1.0..main
```

Die komplette Version gefahrlos in einen separaten Ordner auschecken:

```bash
git worktree add ../computerfuzzis-v0.1.0 v0.1.0
```

Der aktuelle Arbeitsordner und `main` bleiben dabei unverändert.

## Inhalte wiederherstellen

Eine einzelne Datei aus einer älteren Version übernehmen:

```bash
git restore --source v0.1.0 -- index.html
```

Danach die Änderung prüfen und als neuen Commit speichern. So bleibt die Historie
nachvollziehbar, statt sie umzuschreiben.

Für eine vollständige alte Fassung zuerst einen neuen Wiederherstellungs-Branch anlegen:

```bash
git switch -c restore/v0.1.0 v0.1.0
```

Ein älterer Stand wird niemals per Force-Push über `main` geschrieben.

## Eine neue Version veröffentlichen

1. Änderungen unter `Unveröffentlicht` in `CHANGELOG.md` eintragen.
2. Die endgültige Versionsnummer und das Datum ergänzen.
3. Die Versionsnummer in der Datei `VERSION` aktualisieren.
4. Änderungen prüfen, committen und auf `main` pushen.
5. Einen signierten oder annotierten Tag erstellen: `git tag -a vX.Y.Z -m "computerfuzzis.com vX.Y.Z"`.
6. Den Tag pushen: `git push origin vX.Y.Z`.
7. Aus dem Tag ein GitHub-Release mit den Hinweisen aus dem Changelog erstellen.

Tags werden nicht nachträglich verschoben oder wiederverwendet. Eine Korrektur erhält
immer eine neue Versionsnummer.

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

## Lesbare Änderungshistorie pflegen

`CHANGELOG.md` ist der Einstieg für Menschen, die wissen möchten, was gemacht wurde.
Die neuesten Einträge stehen oben. Produktänderungen, Korrekturen und relevante
Arbeiten an Dokumentation oder Technik werden in verständlichem Deutsch beschrieben.

### Bei jeder abgeschlossenen Änderung

1. Unter **Unveröffentlicht** einen kurzen Eintrag schreiben: Was hat sich geändert,
   weshalb und was bedeutet das für die Nutzung? Nur passende Rubriken verwenden:
   Hinzugefügt, Geändert, Behoben, Sicherheit, Dokumentation oder Technik und Wartung.
2. Bereits vorhandene Issue-, PR- oder Commit-Links als Nachweis ergänzen.
   Noch nicht gemergte Branches und geplante Funktionen nicht als erledigt ausgeben.
3. Verständliche Commit- und PR-Titel wählen, beispielsweise
   `feat: Galerie-Import für vorhandene Dokumentfotos ergänzen` oder
   `fix: PDF-Seiten ohne Verzerrung einpassen`.
4. Die `.github/pull_request_template.md` ausfüllen und ein passendes Label setzen.
   Bei einem Squash-Merge übernimmt GitHub standardmäßig PR-Titel und Beschreibung,
   damit Problem, Änderung und Prüfung im Commit erhalten bleiben.

Reine Tippfehler oder Formatierungen brauchen keinen eigenen Changelog-Eintrag;
die Ausnahme im PR begründen. `AGENTS.md` legt die Pflege auch für Agenten fest.

### Beim nächsten geplanten Release

1. Die tatsächlich enthaltenen Einträge aus „Unveröffentlicht“ unter eine neue
   Überschrift mit Versionsnummer und Datum in Europe/Berlin verschieben.
2. Die projektspezifischen Versionsdateien und bestehenden Release-Prüfungen
   verwenden. `MAJOR.MINOR.PATCH` bezeichnet inkompatible Änderungen, neue Funktionen
   beziehungsweise Korrekturen; eine reine Historienpflege benötigt keinen Produktrelease.
3. Den geprüften Commit auf `main` als `vX.Y.Z` markieren und den Tag veröffentlichen.
   Existierende Tags und Artefakte nicht verschieben oder ersetzen.
4. Unter **Releases → Draft a new release** den vorhandenen Tag auswählen.
   **Generate release notes** verwendet die Kategorien aus `.github/release.yml`.
   Die generierten Hinweise prüfen und mit den deutschen Einträgen aus dem Changelog
   ergänzen: GitHub listet vor allem gemergte PRs, direkte Commits sind damit nicht
   vollständig erklärt.
5. Download, Installations-/Testschritte und bekannte Grenzen ergänzen.
   APK-Usertests als **Pre-release** kennzeichnen und die bestehenden Vorgaben zu
   Signatur, Prüfsummen und Geräteabnahme einhalten.
6. Im Changelog einen festen Release-Link sowie einen Vergleich zum vorherigen Tag
   ergänzen. Das neue „Unveröffentlicht“ vergleicht den jüngsten Tag mit `main`.

Die Release-Konfiguration startet keinen Workflow und veröffentlicht nichts von
selbst. Changelog-Pflege erfolgt zusammen mit der Änderung; Release-Hinweise werden
beim bewussten Erstellen eines Releases generiert. Bestehende Build-/CI-Regeln gelten weiter.

### Schnell nachsehen und vergleichen

- [Änderungshistorie](CHANGELOG.md): verständliche Zusammenfassung.
- [GitHub Releases](https://github.com/itmitalles-markus/computerfuzzis.com/releases): versionierte Veröffentlichungen und Downloads.
- [Alle Commits auf main](https://github.com/itmitalles-markus/computerfuzzis.com/commits/main): vollständiger technischer Verlauf.

Einen historischen Stand getrennt öffnen: `git worktree add ../alte-version vX.Y.Z`.
Änderungen zwischen vorhandenen Tags ansehen: `git diff vX.Y.Z..vA.B.C`.

GitHub-Dokumentation: [automatisch erzeugte Release-Hinweise](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
und [Squash-Commit-Texte](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests).

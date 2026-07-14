"""
============================================================
Realm Studio Backend
JSON Service
============================================================

Gestisce il caricamento e il salvataggio dei file JSON.

Supporta:

- File JSON singoli
- Directory contenenti molti file JSON

============================================================
"""

import json
from pathlib import Path


class JsonService:

    @staticmethod
    def load_json(path: Path):
        """
        Carica un singolo file JSON.
        """

        path = Path(path)

        if not path.exists():
            raise FileNotFoundError(path)

        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)

    @staticmethod
    def save_json(path: Path, data):
        """
        Salva un singolo file JSON.
        """

        path = Path(path)

        path.parent.mkdir(parents=True, exist_ok=True)

        with open(path, "w", encoding="utf-8") as file:

            json.dump(
                data,
                file,
                indent=4,
                ensure_ascii=False
            )

    @staticmethod
    def load_directory(directory: Path):
        """
        Carica tutti i file JSON presenti in una directory.
        """

        directory = Path(directory)

        if not directory.exists():
            raise FileNotFoundError(directory)

        objects = []

        for file in sorted(directory.glob("*.json")):

            try:

                with open(file, "r", encoding="utf-8") as f:

                    data = json.load(f)

                    #
                    # Se manca il filename lo aggiungiamo.
                    #

                    if isinstance(data, dict):

                        data["_filename"] = file.name

                    objects.append(data)

            except Exception as ex:

                print(f"[JSON] Errore caricando {file.name}: {ex}")

        return objects

    @staticmethod
    def save_directory(directory: Path, objects):
        """
        Salva una lista di oggetti in una directory.

        Ogni oggetto viene scritto in un file separato.
        """

        directory = Path(directory)

        directory.mkdir(parents=True, exist_ok=True)

        for obj in objects:

            #
            # Nome file
            #

            filename = obj.get("_filename")

            if not filename:

                filename = f"{obj['id']}.json"

            path = directory / filename

            #
            # Non vogliamo salvare il campo interno
            #

            data = dict(obj)

            data.pop("_filename", None)

            with open(path, "w", encoding="utf-8") as file:

                json.dump(

                    data,

                    file,

                    indent=4,

                    ensure_ascii=False

                )
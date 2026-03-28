#!/usr/bin/env python3

import sys

# Ce script contient une erreur volontaire.
# Inutile de l'exécuter — il faut le lire et comprendre la transformation.

# INDICE : la clé XOR est 0x55

ords = [54, 39, 44, 37, 33, 58, 46, 47, 102, 59, 10, 101, 51, 10, 37, 44, 33, 61, 101, 59, 40]

print("Here is your flag:")
print("".join(chr(o ^ undefined_key) for o in ords))  # undefined_key n'existe pas — trouve la bonne valeur

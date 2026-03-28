# Nom d'utilisateur encodé en hexadécimal
nom_hex = "476572617264"

# Mot de passe chiffré par décalage Caesar +7
code_secret = "mshn{yva13_mhjpsl}"

def caesar_decode(texte, decalage):
    result = ''
    for c in texte:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result += chr((ord(c) - base - decalage) % 26 + base)
        else:
            result += c
    return result

def login():
    print("=== Système de connexion sécurisé ===")

    nom = input("Nom d'utilisateur : ")
    mdp = input("Mot de passe : ")

    nom_attendu = bytes.fromhex(nom_hex).decode()

    if nom == nom_attendu:
        mot_de_passe_attendu = caesar_decode(code_secret, 7)

        if mdp == mot_de_passe_attendu:
            print("Accès autorisé. Bienvenue ! Utilise le mot de passe comme solution au défi.")
        else:
            print("Accès refusé : mot de passe incorrect.")
    else:
        print("Accès refusé : utilisateur inconnu.")

login()

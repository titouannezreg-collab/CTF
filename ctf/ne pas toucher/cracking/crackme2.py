code_secret = "synt{ebg13_snpvyr}"

alphabet = str.maketrans(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"
)

def transformation(texte):
    return texte.translate(alphabet)

def login():
    print("=== Systeme de connexion securise ===")

    nom = input("Nom d'utilisateur : ")
    mdp = input("Mot de passe : ")

    if nom == "Gérard":
        mot_de_passe_attendu = transformation(code_secret)

        if mdp == mot_de_passe_attendu:
            print("Acces autorise. Bienvenue ! utilise le mot de passe comme solution au défi")
        else:
            print("Acces refuse : mot de passe incorrect.")
    else:
        print("Acces refuse : utilisateur inconnu.")

login()

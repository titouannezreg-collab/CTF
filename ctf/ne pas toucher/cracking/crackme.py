import base64

def verif_mdp(mdp):
    # Le mot de passe a été encodé pour le protéger
    # Indice : base64, puis XOR avec une clé d'un seul octet
    encoded_b64 = "ZH5lYnU="
    KEY = 0x07

    data = base64.b64decode(encoded_b64)
    correct = ''.join(chr(x ^ KEY) for x in data)

    if mdp != correct:
        print("Accès refusé.")
        return

    print("Bravo ! Solution :", f"flag{{{mdp}}}")

def main():
    print("=== Système de connexion sécurisé ===")
    user_input = input("Entrez le mot de passe : ")
    verif_mdp(user_input)

if __name__ == "__main__":
    main()

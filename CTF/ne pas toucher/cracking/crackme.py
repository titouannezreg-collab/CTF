def verif_mdp(mdp):
    correct = ''.join(chr(x ^ 0x13) for x in [112, 106, 113, 118, 97])

    if mdp != correct:
        print("Accès refusé.")
        return
    
    print("Bravo ! Solution :", f"flag{{{mdp}}}")

def main():
    user_input = input("Entrez le mot de passe : ")
    verif_mdp(user_input)

if __name__ == "__main__":
    main()

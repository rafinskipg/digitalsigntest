SIGNING TEST
========

Demo project for encryption of data. 

It uses node-forge to encrypt with generated certificates. 

It does the following:

- The client asks for the public key 
- The server returns the PEM value of the public key
- The client encrypts the data with the public key
- The client sends the encrypted data to the server
- The server decrypts the data with the private key
# Phonebook app example

Init local

```shell
zsh .docker/scripts/dev.start.sh #db with web ui start

cp .env.dev .env.local
symfony composer install
symfony console doctrine:migrations:migrate
symfony serve # ready to testing
```
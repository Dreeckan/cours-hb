# Source pour la documentation du Makefile : http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.DEFAULT_GOAL := help

#
#
# Commandes principales
#
#
setup: ansible.install install ## Installe le projet

install: ## Installe le projet et toutes ses dépendances, puis les assets et la base de données
	npm install

update: ## Met à jour le projet, sa base de données et ses assets
	npm install

upgrade: ## Met à jour le projet, sa base de données, ses assets et les versions des librairies front ET back
	npm upgrade

run: ## Met à jour les assets et surveille leur modification.
	npm run dev

build: ## Construit les fichiers finaux (prod)
	npm run build

start:
	docker-compose up -d

stop:
	docker-compose down

destroy:
	docker-compose down -v

deploy: ## Déploie sur le serveur de prod
	ansible-playbook -i ansible/prod ansible/deploy/deploy.yml
.PHONY: deploy

ansible.install:
	ansible-galaxy install ansistrano.deploy ansistrano.rollback -p ansible/roles

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-9s\033[0m %s\n", $$1, $$2}'

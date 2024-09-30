## Requirements
- Node 16+
- Docker
- Medusa CLI (`npm install @medusajs/medusa-cli -g`, or use npx instead of medusa commands)

## Setup
1. Create .env file from a copied .env.example file
2. Run `yarn install`
3. Run `docker compose up`
4. Run `medusa migrations run`
5. Run `medusa seed --seed-file=data/seed.json`
6. Run `yarn dev`

You can now it endpoints at http://localhost:9000 and the admin at http://localhost:7001 with the credentials {
"email": "admin@medusa-test.com",
"password": "supersecret"
}, or you can create a user with a command like `medusa user -e steve@armyofbees.com -p 1234Test!`.

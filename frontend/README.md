#Svendeprøve

## Local Setup:

#### Setup requirement:
* Valet
* PHP 8.1
* Node ~14
* MySQL database
* Redis

1. **Clone main repository:**

```
$ git git@github.com:Tomodo531/svendeproeve.git
$ cd svendeproeve
```

2. **Change to php 8.0 if not done already:**

```
$ valet use php@8.1
$ valet link
```

3. **Copy .env.example to .env**

```
$ cp .env.example .env.local
$ php artisan key:generate
```

4. **Run composer install:**

```
$ composer install
```

5. **migrate and seed database:**

```
$ php artisan migrate
$ php artisan db:seed
```

6. **Setup frontend:**

```
$ cd frontend
$ npm install
```

7. **Start local environment (separate console tabs):**

```
$ cd frontend
$ npm run dev
```

```
$ php artisan serve
```

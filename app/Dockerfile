FROM php:8.1.2-apache

WORKDIR /var/www/html

# Mod Rewrite
RUN a2enmod rewrite

# Linux Library
RUN apt-get update -y && apt-get install -y \
    python3 \
    python3-pip \
    git \
    libicu-dev \
    unzip zip \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# PHP Extension
RUN docker-php-ext-install gettext intl pdo_mysql gd

RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# Copy Laravel application files
COPY . /var/www/html
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer update
# Install Composer dependencies
RUN composer install --no-scripts --no-autoloader

# Generate optimized autoload files
RUN composer dump-autoload --no-scripts --optimize

# Install Python dependencies
COPY public/scripts/requirements.txt /var/www/html/public/scripts/requirements.txt
RUN pip3 install --no-cache-dir -r public/scripts/requirements.txt install pip-tools

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache  # Add this line to set permissions

# Enable Apache mod_rewrite
RUN a2enmod rewrite

RUN php artisan migrate --seed

# Expose port 80 and start Apache
EXPOSE 80
CMD ["apache2-foreground"]

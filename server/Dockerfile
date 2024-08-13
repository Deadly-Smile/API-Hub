FROM php:8.2-apache

WORKDIR /var/www/html

# Install required packages and libraries
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip zip \
    libzip-dev \
    zlib1g-dev \
    python3 \
    python3-pip \
    python3-venv \
    && docker-php-ext-install gettext intl pdo_mysql gd zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the entire Laravel application
COPY . /var/www/html

# Set environment variable for Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
# added this to fix composer error, but did not worked
RUN composer update
# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy and set the Apache configuration
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Create a Python virtual environment and install dependencies
RUN python3 -m venv /var/www/html/venv
RUN /var/www/html/venv/bin/pip install --upgrade pip
COPY requirements.txt /var/www/html/requirements.txt
RUN /var/www/html/venv/bin/pip install -r requirements.txt

# Run Laravel migrations and seeds
RUN php artisan migrate:fresh --seed

# Expose port 80 and start Apache
EXPOSE 80
CMD ["apache2-foreground"]

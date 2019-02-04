<?php

use Phinx\Migration\AbstractMigration;

class Lbm1493Dip extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    /*public function change()
    {

    }*/
    
    /**
     * Migrate Up.
     */
    public function up()    
    {
        $this->execute("CREATE TABLE IF NOT EXISTS `notifications` (
                        	`notificationid` INT(11) NOT NULL AUTO_INCREMENT,
                            `notificationname` VARCHAR(200) NULL DEFAULT NULL,
                            `trigger_type` VARCHAR(50) NULL DEFAULT NULL,
                            `trigger_on` VARCHAR(50) NULL DEFAULT NULL,
                            `trigger_for` VARCHAR(50) NULL DEFAULT NULL,
                            `trigger_when_value` INT(11) NULL DEFAULT NULL,
                            `trigger_when_option` VARCHAR(50) NULL DEFAULT NULL,
                            `trigger_date` DATETIME NULL DEFAULT NULL,
                            `product_customer` ENUM('P','C') NULL DEFAULT NULL,
                            `message` TEXT NULL,
                            `selected_products` TEXT NULL,
                            `selected_customers` TEXT NULL,
                            `start_date` DATE NULL DEFAULT NULL,
                            `end_date` DATE NULL DEFAULT NULL,
                            `createdtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                            `modifiedtime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                            `deleted` ENUM('0','1') NULL DEFAULT '0',
                            PRIMARY KEY (`notificationid`)
                    )
                    COLLATE='latin1_swedish_ci'
                    ENGINE=InnoDB
                    AUTO_INCREMENT=1;
                    
                    CREATE TABLE IF NOT EXISTS `notification_sms_config` (
                            `smsconfigid` INT(11) NOT NULL AUTO_INCREMENT,
                            `accountid` VARCHAR(100) NOT NULL DEFAULT '0',
                            `key` VARCHAR(100) NOT NULL DEFAULT '0',
                            `phonenumber` VARCHAR(100) NOT NULL DEFAULT '0',
                            `active` ENUM('Y','N') NOT NULL DEFAULT 'N',
                            `modifiedtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            PRIMARY KEY (`smsconfigid`)
                        )
                    COLLATE='latin1_swedish_ci'
                    ENGINE=InnoDB;   

                    CREATE TABLE IF NOT EXISTS `notification_list` (
                        `listid` INT(11) NOT NULL AUTO_INCREMENT,
                        `notificationid` INT(11) NOT NULL,
                        `date_of_trigger` DATETIME NOT NULL,
                        `customer_name` VARCHAR(100) NOT NULL,
                        `customer_number` VARCHAR(100) NOT NULL,
                        `related_productnumber` VARCHAR(100) NOT NULL,
                        `related_product_id` INT(11) NOT NULL,
                        `finished` ENUM('Y','N') NOT NULL,
                        `finish_date_time` DATETIME NOT NULL,
                        `response` TEXT NOT NULL,
                        PRIMARY KEY (`listid`)
                    )
                    ENGINE=InnoDB;                        
                    ");
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        $this->execute("DROP TABLE IF EXISTS `notifications`;
                        DROP TABLE IF EXISTS `notification_sms_config`;
                        DROP TABLE IF EXISTS `notification_list`;
                        ");
    }     
}

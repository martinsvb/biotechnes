<?php

namespace app\exception;

use Exception;

/**
 * Custom files exception
 *
 * @property _type, Type of exception
 */
class excepFiles extends Exception
{
    private
    $_type = "Files";
    
    public function __construct($message, $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
    
    public function getType()
    {
        return $this->_type;
    }
}

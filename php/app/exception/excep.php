<?php

namespace app\exception;

use app\response\resp;
use app\helpers\csv;
use app\helpers\storage;

/**
 *  Application exception handler
 */
class excep
{
    /**
     *  Log exception
     *  Send exception info response
     *
     *  @param object $e, Injected exception object
     *  @param array $addInfo, Additional exception info
     */
    public function handle($e, $addInfo = [])
    {
        $class = mb_substr(preg_replace("#".$_SERVER['DOCUMENT_ROOT']."/api/#", NULL, $e->getFile()), 0, -4);
        $class = preg_replace('#\/#', '\\', $class);
        
        $ds = storage::getInstance();
        
        $excepInfo = [
            'time' => $ds->time['timeStamp'],
            'type' => $e->getType(),
            'code' => $e->getCode(),
            'file' => $class,
            'line' => $e->getLine(), 
            'message' => method_exists($e, 'getDbMessage') && is_callable([$e, 'getDbMessage']) ? $e->getDbMessage() : $e->getMessage(),
            'trace' => method_exists($e, 'getDbMessage') && is_callable([$e, 'getDbMessage']) ? null : $e->getTraceAsString(),
        ];
        
        if ($addInfo) {
            $excepInfo = $excepInfo + $addInfo;
        }
        
        $csv = new csv();
        $csv->addData("api/_logs/log_exceptions.csv", $excepInfo);
        
        $resp = new resp();
        $resp->send(500, $excepInfo);
    }
}

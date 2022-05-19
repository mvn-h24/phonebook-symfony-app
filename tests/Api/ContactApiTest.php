<?php

namespace App\Tests\Api;

class ContactApiTest extends AbstractApiResourceTestSequence
{
    protected array $testResourceData = [
        'firstName' => 'testFirstName',
        'lastName' => 'testLastName',
        'patronimycName' => 'testPatronimycName'
    ];
    protected array $testUpdateData = ['firstName' => 'updateddd'];
    protected string $resource_url = '/api/contacts';
}
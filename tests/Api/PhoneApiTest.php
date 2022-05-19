<?php


namespace App\Tests\Api;


use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface as TransportExceptionInterfaceAlias;

class PhoneApiTest extends AbstractApiResourceCase
{
    protected string $resource_url = '/api/phones';

    protected int $relatedContactId;

    protected array $testUpdateData = [
        'phoneNumber' => "0000000000",
    ];

    function testRelatedResourceCreate()
    {
        $data = [
            'firstName' => 'testFirstName',
            'lastName' => 'testLastName',
            'patronimycName' => 'testPatronimycName'
        ];
        $response = $this->postOne($data, '/api/contacts');
        static::assertResponseStatusCodeSame(201);
        static::assertJsonContains($data);
        return (int)$response->toArray()['id'];
    }

    /**
     * @depends testRelatedResourceCreate
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementCreate(int $relatedResourceId): array
    {
        $response = $this->postOne(self::testData($relatedResourceId));
        static::assertResponseStatusCodeSame(201);
        static::assertJsonContains(self::testData($relatedResourceId));
        $resId = (int)$response->toArray()['id'];
        return [$resId, $relatedResourceId];
    }

    protected static function testData(int $relatedResourceId): array
    {
        return [
            'phoneNumber' => "+7-123-456-78-90",
            'comment' => "testComment",
            'contact' => "/api/contacts/$relatedResourceId"
        ];
    }

    /**
     * @depends testElementCreate
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementGet(array $dto): array
    {
        [$resId, $relatedResourceId] = $dto;
        $this->getOne($resId);
        static::assertResponseStatusCodeSame(200);
        static::assertJsonContains(self::testData($relatedResourceId));
        return [$resId, $relatedResourceId];
    }

    /**
     * @depends testElementGet
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementUpdate(array $dto): array
    {
        [$resId, $relatedResourceId] = $dto;
        $this->putOne($resId, $this->testUpdateData);
        static::assertResponseStatusCodeSame(200);
        static::assertJsonContains(array_merge(self::testData($relatedResourceId), $this->testUpdateData));
        return [$resId, $relatedResourceId];
    }

    /**
     * @depends testElementUpdate
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementDelete(array $dto): int
    {
        [$resId, $relatedResourceId] = $dto;
        $this->deleteOne($resId);
        static::assertResponseStatusCodeSame(204);
        return $relatedResourceId;
    }

    /**
     * @depends testElementDelete
     *
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementsCollection(int $contacId): int
    {
        $collectionResponse = $this->getCollection();
        static::assertResponseStatusCodeSame(200);
        $countBefore = count($collectionResponse->toArray());

        $res = $this->postOne($this->testData($contacId));
        static::assertResponseStatusCodeSame(201);
        $createdResource = $res->toArray();

        $collectionResponse = $this->getCollection();
        static::assertResponseStatusCodeSame(200);
        $countAfter = count($collectionResponse->toArray());

        $this->assertSame($countAfter, $countBefore + 1);

        $this->deleteOne((int)$createdResource['id']);
        static::assertResponseStatusCodeSame(204);
        return $contacId;
    }

    /**
     * @depends testElementsCollection
     */
    function testRelatedResourceClean(int $id)
    {
        $this->deleteOne($id, '/api/contacts');
        static::assertResponseStatusCodeSame(204);
    }
}
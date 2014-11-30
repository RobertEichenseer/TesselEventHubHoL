    class Program
    {
        static void Main(string[] args)
        {
            string serviceBusNamespace = "Please Provide Your ServiceBus Namespace";
            string serviceBusManageKey = "Please Provide Your ServiceBus Shared Access Key";
            Uri serviceBusUri = ServiceBusEnvironment.CreateServiceUri("sb", serviceBusNamespace, string.Empty);
            TokenProvider tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider("RootManageSharedAccessKey", serviceBusManageKey);
            NamespaceManager nameSpaceManager = new NamespaceManager(string.Format("//{0}/", serviceBusUri.Host), tokenProvider);

            string eventHubName = "EventHubCreatedWithCode";
            string eventHubKeyName = "EventHubKey";
            string eventHubKey = SharedAccessAuthorizationRule.GenerateRandomKey();

            EventHubDescription eventHubDescription = new EventHubDescription(eventHubName) { PartitionCount = 8, MessageRetentionInDays = 1 };
            SharedAccessAuthorizationRule eventHubSendRule = new SharedAccessAuthorizationRule(eventHubKeyName, eventHubKey, new[] { AccessRights.Send, AccessRights.Listen });
            eventHubDescription.Authorization.Add(eventHubSendRule);
            eventHubDescription = nameSpaceManager.CreateEventHubIfNotExists(eventHubDescription);
            string primaryKey = ((SharedAccessAuthorizationRule)eventHubDescription.Authorization.First()).PrimaryKey;
            Console.WriteLine("Primary Key: {0}", primaryKey);
            Console.ReadLine(); 
        }
    }
